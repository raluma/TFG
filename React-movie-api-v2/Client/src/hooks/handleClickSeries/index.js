import {useState} from "react"
import getSeries from "../../services/getSeries"
import { useSeries } from "../useSeries"


export function useHandleClickSeries({ keyword }) {
    const {parameter, setParameter} = useSeries({ keyword })
    const [page, setPages] = useState(2)

    const handleClick = () => {
        setPages(page+1)
        getSeries({ keyword , page })
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