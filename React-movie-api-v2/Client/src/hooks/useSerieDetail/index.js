import { useEffect, useState } from 'react'
import getSerieDetails from '../../services/getSerieDetails'

export function useSerieDetail(id) {
    const [parameter, setParameter] = useState([])


    useEffect(() => {   
        getSerieDetails({ id })
            .then(elements => {
              setParameter(elements)
            }) 
    }, [id]) 


    return parameter
}