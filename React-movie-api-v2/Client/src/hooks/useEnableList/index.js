import { useEffect, useState } from 'react'
import * as db from '../../services/db_funtion';


export function useEnableList(params) {
  const [stageList, setStageList] = useState(
    {loading: true, value: false}
  )



    useEffect(() => {
        db.searchMultimediaList(params)
            .then(enable => { 
                setTimeout(() => {
                    setStageList({ loading: false, value: enable })
                  }, 500)
            }) 
    }, [params]) 

    return stageList
}