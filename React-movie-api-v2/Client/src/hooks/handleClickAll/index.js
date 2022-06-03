import {useState} from "react"
import getAll from "../../services/getAll"
import { useAll } from "../useAll"


export function useHandleClickAll({ keyword }) {
    const {parameter, setParameter} = useAll({ keyword })
    const [page, setPages] = useState(2)

    const handleClick = () => {
        setPages(page+1)
        getAll({ keyword , page })
        .then(elements => {
            setParameter({ results: parameter.results.concat(elements) })
        })
        /*
        setTimeout(() => {
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
        }, 500)
        */
    }
    
    return {handleClick, parameter}
}