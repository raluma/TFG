import React, { useState } from 'react'
import { faLongArrowAltLeft, faStar } from '@fortawesome/fontawesome-free-solid'
import { faAngleLeft, faAngleRight } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'wouter'
import { Carousel } from 'react-responsive-carousel';
import { useMoviePopular } from '../../hooks/useMoviePopular';
import './index.css'
import ItemsCarousel from 'react-items-carousel';
import { useMoviePlaying } from '../../hooks/useMoviePlaying';
import { useMovieTop } from '../../hooks/useMovieTop'
import { useMovieComing } from '../../hooks/useMovieComing'




export default function Movies() {
    const [, pushLocation] = useLocation()
    const moviePopular = useMoviePopular()
    const moviePlaying = useMoviePlaying()
    const movieComing = useMovieComing()
    const movieTop = useMovieTop()
    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const [activeItemIndex1, setActiveItemIndex1] = useState(0)
    const [activeItemIndex2, setActiveItemIndex2] = useState(0)


    const handleClick = () => {
        window.history.back()
    }

    const handleDetails = e => {
        const id = e.target.id
        pushLocation(`/movie/detail/${id}`)
    }

    return <div className='h-full overflow-x-hidden bg-black flex flex-col relative'>


        <section className='w-full h-12 flex items-center bg-zinc-900/70 absolute z-10'>
            <div className='w-10 flex items-center text-zinc-100 hover:cursor-pointer absolute left-6'
                onClick={handleClick}>
                <FontAwesomeIcon icon={faLongArrowAltLeft} className='h-10 ' />
                <p className='h-10 flex items-center px-3'>ATRAS</p>
            </div>
        </section>



        <div className='w-full bg-white '>
            <Carousel className='' autoPlay={setTimeout(true, 1000)}
                infiniteLoop={true} showArrows={false} stopOnHover={true}
                showIndicators={true} showStatus={false} showThumbs={false}
                interval={5000} transitionTime={2000}>

                {moviePopular.loading === true ?
                    <div className='bg-black flex justify-center items-center'>
                        <div className=''>
                            <img className='h-96'
                                src="https://fbflurry.files.wordpress.com/2020/08/giphy-9.gif"
                                alt='loader' />
                        </div>
                    </div>
                    :
                    moviePopular.results.map(element => {
                        return <div className='' key={element.id}>
                            <div className=' h-full w-1/3 left-24 absolute flex 
                            flex-col justify-center items-start z-10'>

                                <div className="text-white text-shadow w-full  
                                font-Montserrat text-left py-1">Estreno: {element.release_date} </div>

                                <div className="text-white text-shadow 
                                w-full text-left font-Montserrat py-1">
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-400 
                                    text-shadow ' /> {element.vote_average} / 10 </div>
                                <div className={element.title.length > 33 ? "title large text-shadow w-full py-3" : "title extralarge text-shadow  w-full py-6"}> {element.title} </div>

                                <button className="h-10 w-28 border-2 boder-zinc-100 
                                font-sans font-bold text-white bg-black rounded-full 
                                hover:bg-red-600 hover:border-0" onClick={handleDetails}
                                    id={element.id}>Detalles</button>
                            </div>
                            <img className='h-96 brightness-75 blur-1' src={element.url} alt={element.title} />
                        </div>
                    })
                }
            </Carousel>
        </div>


        <div className='h-14 w-full flex items-center  border-b border-zinc-500'>
            <p className='font-Montserrat font-extrabold text-zinc-100 absolute left-4'>
                Actualmente en cines :</p>
        </div>
        <div className='text-black my-10 text-center w-[90%] mx-auto'>
            <ItemsCarousel
                activePosition={'center'}
                infiniteLoop={true}
                gutter={2}
                chevronWidth={30}
                numberOfCards={window.innerWidth < 500 ? 3 : 5}
                slidesToScroll={window.innerWidth < 500 ? 3 : 5}
                outsideChevron={true}
                activeItemIndex={activeItemIndex}
                requestToChangeActive={setActiveItemIndex}
                rightChevron={
                    window.innerWidth > 500 ?
                        <button className='text-white bg-zinc-800 h-1/2 rounded-full 
                border-2 border-white ml-7 hover:bg-red-500 w-8
                hover:border-red-500 hover:border-4'>

                            <FontAwesomeIcon icon={faAngleRight} className='h-2/5' />

                        </button> : false
                }

                leftChevron={
                    window.innerWidth > 500 ?
                        <button className='text-white bg-zinc-800 h-1/2  
                rounded-full border-2 w-8
                border-white mr-7 hover:bg-red-500
                hover:border-red-500 hover:border-4' >

                            <FontAwesomeIcon icon={faAngleLeft} className='h-2/5' />
                        </button> : false
                }

            >
                {
                    moviePlaying.results.map(element => {
                        return <div className='h-full rounded-xl flex flex-col overflow-hidden
                        justify-center border-2 border-white w-4/5 mx-auto hover:border-red-500'
                            key={element.id} title={element.vote_average}>

                            <img className='h-full cursor-pointer' src={element.url} alt={element.title}
                                id={element.id} onClick={handleDetails} />

                            <p className='text-white text-sm font-Montserrat'>{element.title}</p>
                        </div>
                    })
                }
            </ItemsCarousel>
        </div>

        <div className='h-14 w-full flex items-center  border-b border-zinc-500'>
            <p className='font-Montserrat font-extrabold text-zinc-100 absolute left-4'>
                Mejor valoradas :</p>
        </div>
        <div className='text-black my-10 text-center w-[90%] mx-auto'>
            <ItemsCarousel
                activePosition={'center'}
                infiniteLoop={true}
                gutter={2}
                chevronWidth={30}
                numberOfCards={window.innerWidth < 500 ? 3 : 5}
                slidesToScroll={window.innerWidth < 500 ? 3 : 5}
                outsideChevron={true}
                activeItemIndex={activeItemIndex1}
                requestToChangeActive={setActiveItemIndex1}
                rightChevron={
                    window.innerWidth > 500 ?
                        <button className='text-white bg-zinc-800 h-1/2 rounded-full 
                border-2 border-white ml-7 hover:bg-red-500 w-8
                hover:border-red-500 hover:border-4'>

                            <FontAwesomeIcon icon={faAngleRight} className='h-2/5' />

                        </button> : false
                }

                leftChevron={
                    window.innerWidth > 500 ?
                        <button className='text-white bg-zinc-800 h-1/2  
                rounded-full border-2 w-8
                border-white mr-7 hover:bg-red-500
                hover:border-red-500 hover:border-4' >

                            <FontAwesomeIcon icon={faAngleLeft} className='h-2/5' />
                        </button> : false
                }

            >
                {
                    movieTop.results.map(element => {
                        return <div className='h-full rounded-xl flex flex-col overflow-hidden
                    justify-center border-2 border-white w-4/5 mx-auto hover:border-red-500'
                            key={element.id} title={element.vote_average}>

                            <img className='h-full cursor-pointer' src={element.url} alt={element.title}
                                id={element.id} onClick={handleDetails} />

                            <p className='text-white text-sm font-Montserrat'>{element.title}</p>
                        </div>
                    })
                }
            </ItemsCarousel>
        </div>

        <div className='h-14 w-full flex items-center  border-b border-zinc-500'>
            <p className='font-Montserrat font-extrabold text-zinc-100 absolute left-4'>
                Próximamente :</p>
        </div>
        <div className='text-black my-10 text-center w-[90%] mx-auto'>
            <ItemsCarousel
                activePosition={'center'}
                infiniteLoop={true}
                gutter={2}
                chevronWidth={30}
                numberOfCards={window.innerWidth < 500 ? 3 : 5}
                slidesToScroll={window.innerWidth < 500 ? 3 : 5}
                outsideChevron={true}
                activeItemIndex={activeItemIndex2}
                requestToChangeActive={setActiveItemIndex2}
                rightChevron={

                    window.innerWidth > 500 ?
                        <button className='text-white bg-zinc-800 h-1/2 rounded-full 
                border-2 border-white ml-7 hover:bg-red-500 w-8
                hover:border-red-500 hover:border-4'>

                            <FontAwesomeIcon icon={faAngleRight} className='h-2/5' />

                        </button> : false
                }

                leftChevron={
                    window.innerWidth > 500 ?
                        <button className='text-white bg-zinc-800 h-1/2  
                rounded-full border-2 w-8
                border-white mr-7 hover:bg-red-500
                hover:border-red-500 hover:border-4' >

                            <FontAwesomeIcon icon={faAngleLeft} className='h-2/5' />
                        </button> : false
                }

            >
                {
                    movieComing.results.map(element => {
                        return <div className='h-full rounded-xl flex flex-col overflow-hidden
                    justify-center border-2 border-white w-4/5 mx-auto hover:border-red-500'
                            key={element.id} title={element.vote_average}>

                            <img className='h-full cursor-pointer' src={element.url} alt={element.title}
                                id={element.id} onClick={handleDetails} />

                            <p className='text-white text-sm font-Montserrat'>{element.title}</p>
                        </div>
                    })
                }
            </ItemsCarousel>
        </div>
    </div>
}
