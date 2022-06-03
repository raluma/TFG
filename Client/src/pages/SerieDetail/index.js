import React from 'react'
import { useSerieDetail } from '../../hooks/useSerieDetail'
import { faLongArrowAltLeft, faUser } from '@fortawesome/fontawesome-free-solid'
import { faHeart as faHeartRegular, faListAlt } from '@fortawesome/fontawesome-free-regular'
import { faHeart as faHeartSolid } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSerieVideo } from '../../hooks/useSerieVideo'
import "../MovieDetail/index.css"
import * as db from '../../services/db_funtion';
import { useSerieCredits } from '../../hooks/useSerieCredits'
import { Carousel } from 'react-responsive-carousel';
import { useEnableHeart } from '../../hooks/useEnableHeart'
import { useLocation } from 'wouter'
import { useEnableList } from '../../hooks/useEnableList'


export default function SerieDetail({ params }) {
    const { id } = params
    const parameter = useSerieDetail(id)
    const results = useSerieVideo(id)
    const {stage, setStage} = useEnableHeart({ type: "S", id_multi: id, id_user: localStorage.getItem('IdSesion')})
    const stageList = useEnableList({ type: "S", id_multi: id, id_user: localStorage.getItem('IdSesion') })
    const actors = useSerieCredits(id)
    const [, pathLocation] = useLocation()

    const handleClick = () => {
        window.history.back()
    }

    const handleLogin = () => {
        localStorage.getItem('IdSesion') === null ?
        pathLocation("/login")
        : 
        pathLocation("/profile")
    }

    const heartClick = () => {
        const { name } = parameter
        !stage.value ? db.insertFav({ title: name, type: "S", id_multi: id, id_user:  localStorage.getItem('IdSesion') }) 
        : db.deletetFav({ type: "S", id_multi: id, id_user:  localStorage.getItem('IdSesion')})

        setStage(!stage.value)
    }
    
    const listClick = () => {
        if (stageList.value) {
            alert("La serie ya está en tu lista")
        } else {
            const { name } = parameter
            db.insertList({ title: name, type: "S", id_multi: id, id_user: localStorage.getItem('IdSesion') })
            alert("La serie ha sido añadida a tu Lista")
        }
    }

    return <section className='h-screen  flex flex-col font-Montserrat'>

        <section className='w-full h-12 flex justify-between items-center px-6 bg-zinc-900'>
            <div className='w-10 flex items-center text-zinc-100 hover:cursor-pointer'
            onClick={handleClick}>
                <FontAwesomeIcon icon={faLongArrowAltLeft} className='h-10 mx-2' />
                <p>ATRAS</p>
            </div>

            <div className='mx-14 w-10 flex items-center text-zinc-100 hover:cursor-pointer'
            onClick={handleLogin}>
                {
                    localStorage.getItem('IdSesion') === null ? <p>LOGIN</p>
                    : <p>{localStorage.getItem('Username')}</p>
                }
                <FontAwesomeIcon icon={faUser} className='h-8 mx-2' />       
            </div>
        </section>

        <section className='flex flex-wrap h-full max-h-[92%]  relative'>

            {/* Background with filter */}
            <div className='h-full object-cover w-full -z-[9] bg-black/80 absolute'></div>
            <img src={parameter.backdropurl} className="w-full -z-10 absolute h-full" alt="" />

            {/* Poster with buttom to website */}
            <article className='px-8 h-full w-[28%] flex items-center  relavite'>
                <div>
                    <img src={parameter.posterurl} alt={parameter.name}
                    className='rounded-t-xl h-auto' />
                    <div className='bg-zinc-900 h-10 flex justify-center items-center
                    text-white font-bold rounded-b-xl hover:bg-amber-500 hover:cursor-pointer hover:text-black'>
                        <a href={parameter.homepage}>PAGINA WEB</a>
                    </div>
                </div>
            </article>


            <article className='p-9 w-[45%] max-h-full text-zinc-100 overflow-auto '>
                <h2 className='text-2xl font-bold'>Titulo: {parameter.name}</h2>
                <p className='my-4' >Sinopsis: {parameter.overview}</p>


                {
                results.loading === true ? 

                    <div className='container flex justify-center items-center h-1/2 '>
                        <span className="loader  " />
                    </div>   
                : typeof results.key === 'undefined' ?
                   <>Trailer inexistente bobo</> 
                : <iframe
                    src={`https://www.youtube.com/embed/${results.key}`}
                    allow="autoplay; encrypted-media; fullscreen"
                    title={parameter.name}
                    className='w-full h-80 my-10 rounded-lg'
                />
                }

            </article>

            <article className="flex flex-col flex-grow ">
                <div className='text-white flex flex-col items-center justify-center rounded-xl h-1/4 w-full '>
                    <div>
                        <p>PUNTUACION Y FAVORITO</p>
                    </div>
                     <div className='flex justify-center w-full'>


                     {
                            localStorage.getItem('IdSesion') !== null ?
                                stage.loading ?
                                <></>
                                :

                                <FontAwesomeIcon icon={ stage.value === true ? faHeartSolid : faHeartRegular} 
                                onClick={heartClick} className={stage.value === true ?
                                'icon-selected' : 'icon-unselected' } />
                            :
                            <FontAwesomeIcon icon={ faHeartRegular} 
                            onClick={()=>{alert('Debe haber iniciado sesión antes de realizar esta acción')}}
                             className={'icon-unselected' } />
                        }
                        
                        {
                            localStorage.getItem('IdSesion') !== null ?
                            <FontAwesomeIcon icon={faListAlt}
                            onClick={listClick} className='h-10 text-zinc-100 hover:cursor-pointer mx-4' /> 
                            :
                            <FontAwesomeIcon icon={faListAlt}
                            onClick={()=>{alert('Debe haber iniciado sesión antes de realizar esta acción')}} 
                            className='h-10 text-zinc-100 hover:cursor-pointer mx-4' /> 
                        }

                        
                    </div>
                </div>
                <div className=' h-3/4 w-full relative flex justify-center items-center'>
                    <div className='absolute w-5/6'>
                        
                        <Carousel className='carousel' autoPlay={setTimeout(true, 1000)} 
                            infiniteLoop={true} showArrows={true} centerMode={true}
                            showIndicators={false} showStatus={false} showThumbs={false}
                            interval={5000} transitionTime={3000} stopOnHover={false}>
                            {actors.loading === true ?
                                <div className='container flex justify-center items-center h-96 '>
                                    <span className="loader  " />
                                </div>
                                :
                                actors.results.slice(0, 10).map(actor => {
                                  
                                    return <div key={`${actor.cast_id}`} className="relative flex justify-center">
                                        <img src={`${actor.profileurl}`} alt="" />
                                        <div className='absolute bottom-0 bg-zinc-900/90 w-full' >
                                            <p className='text-zinc-100 font-bold font-Montserrat'>
                                                {actor.character}
                                            </p>
                                            <p className='text-zinc-400 font-bold font-Montserrat'>
                                                {actor.name}
                                            </p>
                                        </div>
                                    </div>
                                })
                            }
                        </Carousel>
                    </div>
                </div>
            </article>
        </section>
    </section>
}