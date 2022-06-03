import { useEffect, useState } from 'react'
import getMoviePopular from '../../services/getMoviePopular'


export function useMoviePopular() {
    const [movies, setMovies] = useState(
        {loading: true, results: []}
      )


    useEffect(() => {   
        getMoviePopular()
            .then(elements => {
                setTimeout(() => {
                    setMovies({ loading: false, results: elements })
                  }, 1500)
            }) 
    }, []) 


    return movies
}