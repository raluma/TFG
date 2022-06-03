import { useEffect, useState } from 'react'
import getMovieDetails from '../../services/getMovieDetails'

export function useMovieDetail(id) {
    const [parameter, setParameter] = useState([])


    useEffect(() => {   
        getMovieDetails({ id })
            .then(elements => {
              setParameter(elements)
            }) 
    }, [id]) 


    return parameter
}