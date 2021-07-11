import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Paragraph from '.';

describe('component Paragraph', () => {
  test('should render its child as html if passed as string', () => {
    render(<Paragraph>{'Hey <b>ho</b>'}</Paragraph>);
    const boldTag = document.querySelector('b');
    expect(boldTag).toBeInTheDocument();
  });
  test('should render its child as react nodes if passed as such', () => {
    render(
      <Paragraph>
        <i>Italic</i>
      </Paragraph>
    );
    const italicTag = document.querySelector('i');
    expect(italicTag).toBeInTheDocument();
  });
  test('should apply the give className', () => {
    render(<Paragraph className='bellissimo'>Bello</Paragraph>);
    const bellissimo = document.querySelector('.bellissimo');
    expect(bellissimo).toBeInTheDocument();
  });
  test('should be clickable', () => {
    const clickHandler = jest.fn();
    render(<Paragraph onClick={clickHandler}>Bello</Paragraph>);
    const test = screen.getByText(/Bello/i);
    fireEvent.click(test);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
