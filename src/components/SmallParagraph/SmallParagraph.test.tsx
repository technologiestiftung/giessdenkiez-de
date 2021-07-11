import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SmallParagraph from '.';

describe('component SmallParagraph', () => {
  test('should render its child as html if passed as string', () => {
    render(<SmallParagraph>{'Hey <b>ho</b>'}</SmallParagraph>);
    const boldTag = document.querySelector('b');
    expect(boldTag).toBeInTheDocument();
  });
  test('should render its child as react nodes if passed as such', () => {
    render(
      <SmallParagraph>
        <i>Italic</i>
      </SmallParagraph>
    );
    const italicTag = document.querySelector('i');
    expect(italicTag).toBeInTheDocument();
  });
  test('should apply the give className', () => {
    render(<SmallParagraph className='bellissimo'>Bello</SmallParagraph>);
    const bellissimo = document.querySelector('.bellissimo');
    expect(bellissimo).toBeInTheDocument();
  });
  test('should be clickable', () => {
    const clickHandler = jest.fn();
    render(<SmallParagraph onClick={clickHandler}>Bello</SmallParagraph>);
    const test = screen.getByText(/Bello/i);
    fireEvent.click(test);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
