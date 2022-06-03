import { useEffect, useState } from 'react'
import getMovieLatest from '../../services/getMovieLatest'


export function useMovieLatest() {
    const [movies, setMovies] = useState(
        {loading: true, results: []}
      )


    useEffect(() => {   
        getMovieLatest()
            .then(elements => {
                setTimeout(() => {
                    setMovies({ loading: false, results: elements })
                  }, 1500)
            }) 
    }, []) 


    return movies
}