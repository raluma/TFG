import getImage from "../getImage"

const api_key = 'b677204d99e9870416faefa56773d56c'

export default async function getMovieCredits({ id }) {
    const apiURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=es-ES`


    return fetch(apiURL)
        .then(res => res.json())
        .then(response => {
            const data = response.cast
            const actors = data.map(actor => {
                const { name, character, profile_path , cast_id} = actor
                const profileurl = getImage(profile_path)
                return { name, character, profileurl, cast_id }
            })
            return actors
        })
}