import getImage from "../getImage"

const api_key = 'b677204d99e9870416faefa56773d56c'


export default async function getMoviePlaying() { 
    const apiURLMovie = 
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=es-ES&page=1`

    
    return fetch(apiURLMovie)
        .then(res => res.json())
        .then(response => {
            const data = response.results
            const arr = data.map(movie => { 
                const { poster_path, id, release_date, title, vote_average } = movie 

                const url = getImage(poster_path)
                
                return { url, id, release_date, title, vote_average } 
            }) 
            return arr
        })
}