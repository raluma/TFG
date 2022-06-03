const maxMoviepage = 5
// const maxTV = 11999

const api_key = 'b677204d99e9870416faefa56773d56c'

export default async function getTitle() { 
    let apiURL = ""
    let arr = []

    for (let i = 0; i < maxMoviepage; i++) {
        apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-ES&page=${i}`

        fetch(apiURL)
        .then(res => res.json())
        .then(response => {
            const data = response.results
            data.map(movie => { 
                const { title } = movie 
                arr.push(title)
                return 0
            }) 
            
        })
    }
    return arr
}