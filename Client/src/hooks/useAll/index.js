import { useEffect, useState } from 'react'
import getAll from '../../services/getAll'

export function useAll({ keyword }) {
    const [parameter, setParameter] = useState(
      {loading: true, results: []}
    )
    const [page] = useState(1)

    useEffect(() => {
        getAll({ keyword , page })
            .then(elements => {
              setTimeout(() => {
                setParameter({ loading: false, results: elements })
              }, 1500)
              /*
              setTimeout(() => {
                window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
              }, 500)
              */
            }) 
    }, [keyword, page]) 




    return { parameter, setParameter }
}