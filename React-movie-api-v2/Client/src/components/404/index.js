import React from 'react'
import { useLocation } from 'wouter'
import { faHome } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const url404 = "https://cdn.dribbble.com/users/547471/screenshots/3063720/not_found.gif"

export default function E404() {
    const [, pathLocation] = useLocation()

    const handleClick = () => {
        pathLocation('/')
    }
    
    return  <div className='absolute border-red-700 w-[800px] h-[600px]'>
                <div className='h-4 w-12 absolute 
                top-5 left-12 hover:cursor-pointer' 
                onClick={handleClick}></div>

                <div className='text-white absolute bottom-24 left-[46.5%] 
                font-Montserrat text-lg'>
                    <FontAwesomeIcon icon={faHome} className='ml-4'/>
                    <div className='mt-2 hover:cursor-pointer hover:underline' 
                    onClick={handleClick}>Home</div>
                </div>

                <img src={url404} alt="error 404" className='w-full h-full' />
            </div>  
}