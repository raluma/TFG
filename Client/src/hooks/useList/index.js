import { useEffect, useState } from 'react'
import * as db from '../../services/db_funtion';


export function useList(params) {
  const [list, setList] = useState(
    {loading: true, value: false}
  )

    useEffect(() => {
        db.getMultimediaList(params)
            .then(elements => { 
                setTimeout(() => {
                    setList({ loading: false, value: elements })
                  }, 500)
            }) 
    }, [params]) 

    return list
}