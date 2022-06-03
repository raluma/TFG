import { useEffect, useState } from 'react'
import getSerieComing from '../../services/getSerieComing'


export function useSerieComing() {
    const [serie, setSerie] = useState(
        {loading: true, results: []}
      )


    useEffect(() => {   
        getSerieComing()
            .then(elements => {
                setTimeout(() => {
                    setSerie({ loading: false, results: elements })
                  }, 1500)
            }) 
    }, []) 


    return serie
}