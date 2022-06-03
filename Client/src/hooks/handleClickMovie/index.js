import {useState} from "react"
import getMovies from "../../services/getMovies"
import { useMovie } from "../useMovie"


export function useHandleClickMovie({ keyword }) {
    const {parameter, setParameter} = useMovie({ keyword })
    const [page, setPages] = useState(2)

    const handleClick = () => {
        setPages(page+1)
        getMovies({ keyword , page })
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