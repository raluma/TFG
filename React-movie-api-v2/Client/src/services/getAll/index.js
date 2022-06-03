import getImage from "../getImage"

const api_key = 'b677204d99e9870416faefa56773d56c'
const img404 = 'https://images-na.ssl-images-amazon.com/images/I/41bLP6NzvKL.jpg'


export default async function getAll({ keyword, page }) { 
    const apiURL = 
    `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=es-ES&query=${keyword}&page=${page}`

    return fetch(apiURL)
        .then(res => res.json())
        .then(response => {
            const data = response.results
            const elements = data.map(element => { 
                const { title, name, id, poster_path, media_type } = element 
                const url = getImage(poster_path)
                return url === '' ? {title, id, name, url: img404, media_type} 
                : { title, id, name, url , media_type }
            })
            return elements
        })
}