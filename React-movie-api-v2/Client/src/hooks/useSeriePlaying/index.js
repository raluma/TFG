import { useEffect, useState } from 'react'
import getSeriePlaying from '../../services/getSeriePlaying'


export function useSeriePlaying() {
    const [serie, setSerie] = useState(
        {loading: true, results: []}
      )


    useEffect(() => {   
        getSeriePlaying()
            .then(elements => {
                setTimeout(() => {
                    setSerie({ loading: false, results: elements })
                  }, 1500)
            }) 
    }, []) 


    return serie
}