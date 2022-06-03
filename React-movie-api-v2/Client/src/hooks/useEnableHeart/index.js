import { useEffect, useState } from 'react'
import * as db from '../../services/db_funtion';


export function useEnableHeart(params) {
  const [stage, setStage] = useState(
    {loading: true, value: false}
  )

    useEffect(() => {
        db.searchMultimediaFav(params)
            .then(enable => { 
                setTimeout(() => {
                    setStage({ loading: false, value: enable })
                  }, 500)
            }) 
    }, [params]) 

    return {stage, setStage}
}