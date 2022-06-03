import { useEffect, useState } from 'react'
import getMovieVideo from '../../services/getMovieVideo'

export function useMovieVideo(id) {
  const [parameter, setParameter] = useState(
    {loading: true, key: ''}
  )


    useEffect(() => {   
        getMovieVideo({ id })
            .then(elements => {
              setTimeout(() => {
                setParameter({ loading: false, key: elements })
              }, 1500)
            }) 
    }, [id]) 


    return parameter

}