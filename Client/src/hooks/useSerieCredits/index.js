import { useEffect, useState } from 'react'
import getSerieCredits from '../../services/getSerieCredits'


export function useSerieCredits(id) {
    const [actors, setActors] = useState(
        {loading: true, results: []}
      )


    useEffect(() => {   
        getSerieCredits({ id })
            .then(elements => {
                setTimeout(() => {
                    setActors({ loading: false, results: elements })
                  }, 1500)
            }) 
    }, [id]) 


    return actors
}