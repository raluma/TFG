import getImage from "../getImage"

const api_key = 'b677204d99e9870416faefa56773d56c'


export default async function getBackdrop() { 
    const apiURLMovie = 
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-ES&page=1`

    const apiURLSerie = 
    `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=es-ES&page=1`
    
    const arr = []
    const arr2 = []
    const arrId = []

    fetch(apiURLMovie)
        .then(res => res.json())
        .then(response => {
            const data = response.results
            data.map(movie => { 
                const { backdrop_path, poster_path, id } = movie 

                const url = getImage(backdrop_path)
                arr.push(url)

                const img = getImage(poster_path)
                arr2.push(img)

                arrId.push(id)

                return 1
            }) 
        })
    
    fetch(apiURLSerie)
        .then(res => res.json())
        .then(response => {
            const data = response.results
            data.map(serie => { 
                const { backdrop_path , poster_path, id } = serie 

                const url = getImage(backdrop_path)
                arr.push(url)
                
                const img = getImage(poster_path)
                arr2.push(img)

                arrId.push(id)

                return 1
            }) 
        })

    return [arr, arr2, arrId]
}