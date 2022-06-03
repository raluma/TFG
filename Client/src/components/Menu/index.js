import React from 'react'
import ListOfArticles from '../ListOfArticles'

export default function Menu(params) {  
  return <div className={
    params.orientation === 'H' ? 'menuH' 
  : params.orientation === 'V' ? 'menuV' : ''} >
       <ListOfArticles list={params.list} orientation={params.orientation}/>
  </div>
}
