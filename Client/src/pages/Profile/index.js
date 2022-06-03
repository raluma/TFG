import { faEye, faEyeSlash, faLongArrowAltLeft, faTrash } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useLocation } from 'wouter';
import { useFav } from '../../hooks/useFav';
import { useList } from '../../hooks/useList';
import { useProfile } from '../../hooks/useProfile';
import * as db from '../../services/db_funtion';

export default function Profile() {
    const [, pathLocation] = useLocation()
    const fav = useFav({ id_user: localStorage.getItem('IdSesion') })
    const list = useList({ id_user: localStorage.getItem('IdSesion') })
    const profile = useProfile({ id: localStorage.getItem('IdSesion') })
    const [view, setView] = useState(false)

    let countFav = 0
    let countList = 0

    if(localStorage.getItem('IdSesion') === null){
        pathLocation('/')
    }

    const handleView = () => {
        setView(!view)
    }

    const handleHome = () => {
        pathLocation("/")
    }

    const handleDelete = (id, type) => {
        const id_user = localStorage.getItem('IdSesion')
        const id_multi = id
        const tipo = type

        db.deletetList({ type: tipo , id_multi: id_multi, id_user: id_user })
    }

    const handleSession = () => {
        window.localStorage.clear()
        pathLocation("/")
    }

    const handleAccount = () => {
        const res = prompt("Escriba ELIMINAR si realmente desea eliminar la cuenta.")
        
        res === 'ELIMINAR'?
        db.deleteUser({ id: localStorage.getItem('IdSesion') }).then(response => {
            if (response === 'true') {
                alert('Se ha borrado la cuenta con éxito')
                window.localStorage.clear()
                pathLocation('/')
            } else {  
                alert('Ha habido un error al borrar la cuenta')
            }
        })
        :
        alert('No se ha eliminado la cuenta')
    }

    const handleDetails = e => {
        const id = e.target.id

        const tipo = e.target.dataset.tipo === 'M' ? 'movie' : 'serie'
        pathLocation(`/${tipo}/detail/${id}`)
    }

    return <div className='h-screen bg-zinc-900 flex flex-col'>

        <section className='w-full h-12 flex items-center border-b border-b-zinc-200'>
            <div className='w-10 flex items-center text-zinc-100 hover:cursor-pointer absolute left-6'
                onClick={handleHome}>
                <FontAwesomeIcon icon={faLongArrowAltLeft} className='h-10 ' />
                <p className='h-10 flex items-center px-3'>HOME</p>
            </div>
        </section>


        <div className=' h-screen flex'>
            <div className='p-6 w-[25%]  border-r border-zinc-200'>
                <h1 className='text-2xl font-Montserrat text-zinc-100'>PROFILE</h1>
                <div className=''>

                    {
                        profile.loading === true ?
                            <div className='container flex justify-center items-center h-52 '>
                                <span className="loader  " />
                            </div>
                            :
                            <div className='h-72'>
                                <div className='text-zinc-200 flex flex-col justify-evenly h-72'>
                                    <div>
                                        <p className='font-bold'> NOMBRE DE USUARIO</p>
                                        <p>{profile.value[0].NOMBRE}</p>
                                    </div>
                                    
                                    <div>
                                        <p className='font-bold'> EMAIL </p> 
                                        <p>{profile.value[0].CORREO}</p>
                                    </div>
                                    
                                    <div className=''>
                                        <p className='font-bold'> CONTRASEÑA</p> 
                                        <p>
                                            {
                                            view ?
                                            '*'.repeat(profile.value[0].CONTRASENA.length)
                                            : profile.value[0].CONTRASENA
                                            }
                                        </p>
                                        <span onClick={handleView} className='flex justify-center p-3 hover:cursor-pointer border rounded-md mt-2'>
                                            <p className=' text-zinc-100'>{view ? 'Mostrar contraseña' : 'Ocultar contraseña'}</p>
                                            <FontAwesomeIcon className='translate-y-1 translate-x-2 text-zinc-100' 
                                            icon={view ? faEye : faEyeSlash} 
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-around h-20'>
                                    <button className='font-bold font-Montserrat  border w-full border-zinc-100 rounded-md text-zinc-100 hover:cursor-pointer hover:scale-105' onClick={handleSession}>Cerrar Session</button>
                                    <button className='font-bold font-Montserrat border border-red-600 w-full rounded-md bg-red-600 text-zinc-100 hover:cursor-pointer hover:scale-105' onClick={handleAccount}>Eliminar Cuenta</button>
                                </div>
                            </div>
                    }


                </div>
            </div>
            <div className=' h-full w-[75%] flex relative'>
                <div className='p-6 absolute h-full w-1/2'>
                    <h1 className='text-2xl font-Montserrat text-zinc-100 text-center'>FAVORITOS</h1>
                    <div className=' max-h-[95%] overflow-auto'>
                        {
                            fav.loading === false ?
                                <table className='w-full mt-2'>

                                    {

                                        fav.value.map(result => {
                                            countFav++
                                            return <tr className={
                                                countFav % 2 === 0 ? 'border bg-zinc-900'
                                                    : 'border bg-zinc-700'
                                            }>
                                                <td id={result.ID_MULTIMEDIA} data-tipo={result.TIPO}
                                                    className='text-zinc-200 font-light text-left hover:text-red-600 hover:cursor-pointer'
                                                    onClick={handleDetails}>
                                                    {result.TIPO === 'M' ? 'Película: ' : 'Serie: '}
                                                    {result.NOMBRE}
                                                </td>
                                            </tr>
                                        })
                                    }
                                </table>
                                :

                                <div className='container flex justify-center items-center h-52 '>
                                    <span className="loader  " />
                                </div>
                        }
                    </div>
                </div>
                <div className='p-6 absolute h-full left-1/2 w-1/2 '>
                    <h1 className='text-2xl font-Montserrat text-zinc-100 text-center'>VER MÁS TARDE</h1>
                    <div className=' max-h-[95%] overflow-auto'>
                        {

                            list.loading === false ?

                                <table className='w-full mt-2'>

                                    {


                                        list.value.map(result => {
                                            countList++
                                            return <tr className={
                                                countList % 2 === 0 ? 'border bg-zinc-900'
                                                    : 'border bg-zinc-700'
                                            }>
                                                <td id={result.ID_MULTIMEDIA} data-tipo={result.TIPO}
                                                    className='text-zinc-200 font-light text-left hover:text-red-600 hover:cursor-pointer'
                                                    onClick={handleDetails}>
                                                    {result.TIPO === 'M' ? 'Película: ' : 'Serie: '}
                                                    {result.NOMBRE}
                                                </td>
                                                <td className='border hover:cursor-pointer h-full w-1 px-1'
                                                onClick={()=>{handleDelete(result.ID_MULTIMEDIA, result.TIPO)}} >
                                                    <FontAwesomeIcon className='text-zinc-100' icon={faTrash} />
                                                </td>
                                            </tr>
                                        })


                                    }

                                </table>
                                :
                                <div className='container flex justify-center items-center h-52 '>
                                    <span className="loader  " />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}