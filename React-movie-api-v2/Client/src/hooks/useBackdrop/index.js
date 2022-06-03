import { useEffect, useState } from 'react'
import getBackdrop from '../../services/getBackdrop'


export function useBackdrop() {
  const [parameter, setParameter] = useState()

    useEffect(() => {
        getBackdrop()
            .then(elements => { 
                setTimeout(() => {setParameter(elements)}, 1000)
            }) 
    }, []) 


    return parameter
}