import React from 'react';

export const HoverObject: React.FC<{
  message: string;
  pointer: number[];
}> = ({ message, pointer }) => {
  console.log(message);
  console.log(pointer);

  return (
    <div
      className='is-size-7'
      style={{
        position: 'absolute',
        zIndex: 10,
        pointerEvents: 'none',
        left: pointer[0],
        top: pointer[1],
      }}
    >
      <span
        style={{
          backgroundColor: '#ffffff',
          padding: '0.2rem 1rem 0.2rem 1rem',
          boxShadow: '1px 2px 1px rgba(51,51,102, .5)',
        }}
      >
        {message}
      </span>
    </div>
  );
};
