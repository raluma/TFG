import React from 'react'

export default function Button({ handleClick ,children }) {
  return <button onClick={handleClick} className='btn'>
    {children}
  </button>
}
