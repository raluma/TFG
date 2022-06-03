import { useEffect, useState } from 'react'

import getSeriePopular from '../../services/getSeriePopular'


export function useSeriePopular() {
    const [serie, setSerie] = useState(
        {loading: true, results: []}
      )


    useEffect(() => {   
        getSeriePopular()
            .then(elements => {
                setTimeout(() => {
                    setSerie({ loading: false, results: elements })
                  }, 1500)
            }) 
    }, []) 


    return serie
}