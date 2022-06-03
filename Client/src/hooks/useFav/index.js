import { useEffect, useState } from 'react'
import * as db from '../../services/db_funtion';


export function useFav(params) {
  const [fav, setFav] = useState(
    {loading: true, value: false}
  )

    useEffect(() => {
        db.getMultimediaFav(params)
            .then(elements => { 
                setTimeout(() => {
                    setFav({ loading: false, value: elements })
                  }, 500)
            }) 
    }, [params]) 

    return fav
}