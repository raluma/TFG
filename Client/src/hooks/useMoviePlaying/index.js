import { useEffect, useState } from 'react'
import getMoviePlaying from '../../services/getMoviePlaying'


export function useMoviePlaying() {
    const [movies, setMovies] = useState(
        {loading: true, results: []}
      )


    useEffect(() => {   
        getMoviePlaying()
            .then(elements => {
                setTimeout(() => {
                    setMovies({ loading: false, results: elements })
                  }, 1500)
            }) 
    }, []) 


    return movies
}