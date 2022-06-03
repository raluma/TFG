import React from 'react'
import { useLocation } from 'wouter'

export default function Article({ children , url, cssArticles, orientation }) {
  const [, pathLocation] = useLocation()
  
  const handleClick = () => {
    pathLocation(url)
  }
  

  return <div key={url} className={
    children === 'LINEA' && orientation === 'V' ? 'lineaV' 
  : children === 'LINEA' && orientation === 'H' ? 'lineaH -translate-x-14'
  : children === 'LOGIN' && orientation === 'V' ? 'article sm:translate-y-7'
  : children === 'LOGIN' && orientation === 'H' ? 'article -translate-x-20'  
  : `article ${cssArticles}`} onClick={handleClick}>
    {children === 'LINEA' ? '' : children}
  </div>
  
}
