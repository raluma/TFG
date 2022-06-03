import { useEffect, useState } from 'react'
import getMovieCredits from '../../services/getMovieCredits'


export function useMovieCredits(id) {
    const [actors, setActors] = useState(
        {loading: true, results: []}
      )


    useEffect(() => {   
        getMovieCredits({ id })
            .then(elements => {
                setTimeout(() => {
                    setActors({ loading: false, results: elements })
                  }, 1500)
            }) 
    }, [id]) 


    return actors
}