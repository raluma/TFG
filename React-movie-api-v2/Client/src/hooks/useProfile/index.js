import { useEffect, useState } from 'react'
import * as db from '../../services/db_funtion';


export function useProfile(params) {
  const [profile, setProfile] = useState(
    {loading: true, value: false}
  )

    useEffect(() => {
        db.getProfile(params)
            .then(elements => { 
                setTimeout(() => {
                    setProfile({ loading: false, value: elements })
                  }, 500)
            }) 
    }, [params]) 

    return profile
}