import React, {
  ChangeEventHandler,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';

import { format, isValid, parse } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { DayPicker } from 'react-day-picker';
import { usePopper } from 'react-popper';
import styled, { useTheme } from 'styled-components';
const iconCalendar = '/images/calendar.svg';

import de from 'date-fns/locale/de';

const StyledInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%;
`;

const StyledLabel = styled.label`
  grid-column: 1 / 3;
  display: block;
  font-size: ${p => p.theme.fontSizeLl};
`;

const StyledDateInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${p => p.theme.colorTextMedium};
  color: ${p => p.theme.colorTextDark};
  &::selection {
    background: ${p => p.theme.colorPrimary};
    color: white;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const StyledCalendarButton = styled.button`
  margin-left: 4px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${p => p.theme.colorTextMedium};
  background: white;
  cursor: pointer;
  line-height: 1;
  &:hover {
    background: ${p => p.theme.colorLightGrey};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const DATE_FORMAT = 'dd-MM-y';

export const formatDate = (date: Date): string => {
  return format(date, DATE_FORMAT);
};

export interface DatePickerDialogType {
  id: string;
  label: string;
  defaultDate?: Date;
  onDateChange: (val: Date) => void;
}

export const DatePickerDialog: FC<DatePickerDialogType> = ({
  id,
  label,
  defaultDate,
  onDateChange = () => undefined,
}) => {
  const [selected, setSelected] = useState<Date | undefined>(defaultDate);
  const [inputValue, setInputValue] = useState<string>('');
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const theme = useTheme();

  useEffect(() => {
    if (!selected) return;
    setInputValue(formatDate(selected));
    onDateChange(selected);
  }, [selected, onDateChange]);

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-start',
  });

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, DATE_FORMAT, new Date());
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
      setInputValue(formatDate(new Date())); // if an invalid date string is provided, we default back to the current day
    }
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!date) return;
    setSelected(date);
    if (date) {
      setInputValue(formatDate(date));
      closePopper();
    } else {
      setInputValue('');
    }
  };

  return (
    <div>
      <StyledInputContainer ref={popperRef}>
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
        <div style={{ width: '100%', display: 'flex', marginTop: '8px' }}>
          <StyledDateInput
            id={id}
            type='text'
            size={1}
            value={inputValue}
            onChange={handleInputChange}
          />
          <StyledCalendarButton
            ref={buttonRef}
            type='button'
            aria-label='Wähle ein Datum'
            onClick={handleButtonClick}
          >
            <span aria-hidden={true}>
              <img src={iconCalendar} width={20} height={20} />
            </span>
          </StyledCalendarButton>
        </div>
      </StyledInputContainer>
      {isPopperOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            onDeactivate: closePopper,
          }}
        >
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            className='dialog-sheet'
            {...popper.attributes.popper}
            ref={setPopperElement}
            role='dialog'
          >
            <DayPicker
              locale={de}
              initialFocus={isPopperOpen}
              mode='single'
              defaultMonth={selected}
              selected={selected}
              onSelect={handleDaySelect}
              styles={{
                root: {
                  backgroundColor: 'white',
                  transform: 'none',
                  // TODO: Type the theme object from useTheme:
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  border: `1px solid ${theme.colorTextMedium}`,
                  borderRadius: '4px',
                  margin: 0,
                  marginTop: '4px',
                  padding: '10px',
                },
                caption: {
                  // TODO: Type the theme object from useTheme:
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  color: theme.colorPrimary,
                },
              }}
              modifiersStyles={{
                selected: {
                  // TODO: Type the theme object from useTheme:
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  backgroundColor: theme.colorPrimary,
                  borderColor: 'transparent',
                },
              }}
            />
          </div>
        </FocusTrap>
      )}
    </div>
  );
};
