import { useEffect, useState } from 'react'
import getSerieVideo from '../../services/getSerieVideo'

export function useSerieVideo(id) {
  const [parameter, setParameter] = useState(
    {loading: true, key: ''}
  )


    useEffect(() => {   
        getSerieVideo({ id })
            .then(elements => {
              setTimeout(() => {
                setParameter({ loading: false, key: elements })
              }, 1500)
            }) 
    }, [id]) 


    return parameter
}