import getImage from "../getImage"

const api_key = 'b677204d99e9870416faefa56773d56c'

export default async function getSerieDetails({ id }) { 
    const apiURL = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=es-ES`


    return fetch(apiURL)
        .then(res => res.json())
        .then(response => {
            const genres = response.genres.map(name => {
                return {name}
            })
            const { backdrop_path, homepage, name,overview,
                    poster_path, vote_average,
                    first_air_date } = response

            const backdropurl = getImage(backdrop_path)
            const posterurl = getImage(poster_path)

            return overview === '' ?
            { backdropurl, homepage, name, overview: 'No está disponible bobo.',
                posterurl, vote_average,
                first_air_date, genres }
            :
            { backdropurl, homepage, name, overview,
            posterurl, vote_average,
            first_air_date, genres }
        })
}