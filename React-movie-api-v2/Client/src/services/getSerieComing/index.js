import getImage from "../getImage"

const api_key = 'b677204d99e9870416faefa56773d56c'


export default async function getSerieComing() { 
    const apiURLSerie = 
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}&language=es-ES&page=1`

    
    return fetch(apiURLSerie)
        .then(res => res.json())
        .then(response => {
            const data = response.results
            const arr = data.map(serie => { 
                const { poster_path, id, release_date, name, vote_average } = serie 

                const url = getImage(poster_path)
                
                return { url, id, release_date, name, vote_average } 
            }) 
            return arr
        })
}