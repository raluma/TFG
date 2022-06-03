import getImage from "../getImage"

const api_key = 'b677204d99e9870416faefa56773d56c'


export default async function getMoviePopular() { 
    const apiURLMovie = 
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-ES&page=1`

    
    return fetch(apiURLMovie)
        .then(res => res.json())
        .then(response => {
            const data = response.results
            const arr = data.map(movie => { 
                const { backdrop_path, id, release_date, title, vote_average} = movie 

                const url = getImage(backdrop_path)
                
                return { url, id, release_date, title, vote_average } 
            }) 
            return arr
        })
}