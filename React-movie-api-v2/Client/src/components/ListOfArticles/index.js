import React from 'react'
import Article from '../Article'

export default function ListOfArticles(params) {
  const { list } = params

  let url = window.location.href.split("/")[4]
  
  const conditionRefactor = () => {
    url === 'serie' ? url = 'SERIES' 
    : url === 'movie' ? url = 'MOVIES' : url = ''
  }

  conditionRefactor()
  const condition = (e) => e === url ? 'selectedA' : ''


  return <div className={
    params.orientation === 'H' ? 'articlesH'
    : params.orientation === 'V' ? 'articlesV' : ''
  }>
   {
       Object.keys(list).map(function(e) {
            
            return <Article key={e} children={e} url={this[e]} cssArticles={condition(e)} orientation={params.orientation}/ >
        }, list)
   }
    
  </div>
}
