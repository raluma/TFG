import { useEffect, useState } from 'react'
import getTitle from '../../services/getTitle';

export function useTitle() {
  const [parameter, setParameter] = useState(
    {loading: true, results: []}
  )

    useEffect(() => {
        getTitle()
            .then(elements => {
              setTimeout(() => {
                setParameter({ loading: false, results: elements })
               }, 1500)
            }) 
    }, []) 


    return parameter
}