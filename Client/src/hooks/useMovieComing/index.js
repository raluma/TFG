import { useEffect, useState } from 'react'
import getMovieComing from '../../services/getMovieComing'



export function useMovieComing() {
    const [movies, setMovies] = useState(
        {loading: true, results: []}
      )


    useEffect(() => {   
        getMovieComing()
            .then(elements => {
                setTimeout(() => {
                    setMovies({ loading: false, results: elements })
                  }, 1500)
            }) 
    }, []) 


    return movies
}