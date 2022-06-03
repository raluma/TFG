import { useEffect, useState } from 'react'
import getMovieTop from '../../services/getMovieTop'


export function useMovieTop() {
    const [movies, setMovies] = useState(
        {loading: true, results: []}
      )


    useEffect(() => {   
        getMovieTop()
            .then(elements => {
                setTimeout(() => {
                    setMovies({ loading: false, results: elements })
                  }, 1500)
            }) 
    }, []) 


    return movies
}