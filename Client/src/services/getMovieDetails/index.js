import getImage from "../getImage"

const api_key = 'b677204d99e9870416faefa56773d56c'

export default async function getMovieDetails({ id }) { 
    const apiURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=es-ES`


    return fetch(apiURL)
        .then(res => res.json())
        .then(response => {
            const genres = response.genres.map(name => {
                return {name}
            })
            const { backdrop_path, homepage, title, 
                    overview, poster_path, tagline, vote_average,
                    release_date } = response

            const backdropurl = getImage(backdrop_path)
            const posterurl = getImage(poster_path)

            return overview === '' ? { backdropurl, homepage, title, 
                overview: 'No está disponible.' , posterurl, tagline, vote_average,
                release_date, genres }
            :
            {backdropurl, homepage, title, 
            overview, posterurl, tagline, vote_average,
            release_date, genres }
        })
}