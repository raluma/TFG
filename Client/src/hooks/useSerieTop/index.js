import { useEffect, useState } from 'react'

import getSerieTop from '../../services/getSerieTop'


export function useSerieTop() {
    const [serie, setSerie] = useState(
        {loading: true, results: []}
      )


    useEffect(() => {   
        getSerieTop()
            .then(elements => {
                setTimeout(() => {
                    setSerie({ loading: false, results: elements })
                  }, 1500)
            }) 
    }, []) 


    return serie
}