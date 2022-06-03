import React, { useState } from 'react'
import { useLocation } from 'wouter'
import Menu from '../../components/Menu'
import "./index.css"
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useBackdrop } from '../../hooks/useBackdrop';
import { useMenu } from '../../hooks/useMenu';

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [, pushLocation] = useLocation()
  const parameter = useBackdrop()
  const list = useMenu()

  //Top of Movie and Serie
  let i = -1


  const handleSubmit = e => {
    e.preventDefault()
    keyword === '' ? pushLocation('/404')
      : pushLocation(`/search/${keyword}`)
  }

  const handleChange = e => {
    setKeyword(e.target.value)
  }


  const handleClick = e => {
    const number = e.target.id.split('/')[0]
    const id = e.target.id.split('/')[1]
    number < 20 ? pushLocation(`/movie/detail/${id}`) :
    pushLocation(`/serie/detail/${id}`)
  }

  return <div id='container' className='home'>
    <Menu list={list} orientation={'V'} />
    <div className='h-screen sm:w-screen flex flex-col items-center'>
     
      <div className='w-11/12 bg-white my-10'>       
            <Carousel className='carousel border-0' autoPlay={setTimeout(true, 1000)} 
            infiniteLoop={true} showArrows={true} stopOnHover={false}
             showIndicators={false} showStatus={false} showThumbs={false} 
             interval={5000} transitionTime={2000}>
                   
               {parameter === undefined ?
                    <div className='bg-black flex justify-center items-center'>
                      <div className=''>
                          <img className='h-96'
                          src="https://fbflurry.files.wordpress.com/2020/08/giphy-9.gif" 
                          alt='loader'/>
                      </div>
                    </div>
                 :  
                 parameter[0].map(() => { 
                    i++;
                    return <div className='flex justify-center items-center' 
                    key={parameter[2][i]}>
                      <div className='absolute z-10 w-[255px] h-96 cursor-pointer' 
                      id={`${i}/${parameter[2][i]}`} title={`Top ${i+1}`} onClick={handleClick}>
                      <img 
                          src={parameter[1][i]} alt={`img${i}`} className='h-full'/>
                      </div> 
                       <img className='h-96 brightness-75 blur-[2px]'
                       src={parameter[0][i]} alt={`img${i}`}/>
                     </div>
                  })
                 }
            </Carousel>
        </div>

      <form onSubmit={handleSubmit} className="relative">
        <input placeholder=" Search a title here..." onChange={handleChange}
          type='text' value={keyword} className='rounded-full p-3 mt-1
                        w-[20rem] sm:w-[23rem] lg:w-[38rem] outline-double 
                        focus:outline-8 focus:outline-white font-Montserrat' />
        <FontAwesomeIcon icon={faSearch} className="text-black text-xl absolute 
                        right-5 top-4 hover:cursor-pointer" title="buscador"
                        onClick={handleSubmit}/>
      </form>
    </div>
  </div>
}