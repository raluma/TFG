const api_key = 'b677204d99e9870416faefa56773d56c'

export default async function getSerieVideo({ id }) { 
    const apiURL = 
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api_key}&language=es-ES`
    const apiURLEN = 
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api_key}&language=en-EN`

    return fetch(apiURL)
        .then(res => res.json())
        .then(response => {
            const data = response.results
            if (data.length !== 0) {
                for (let element of data) {
                    if (element.type === 'Trailer') return element.key
                    else if (element.type === 'Teaser') return element.key 
                    else if (element.type === 'Clip') return element.key  
                }             
            } else {
                
            return fetch(apiURLEN)
                .then(res => res.json())
                .then(response => {
                    const data = response.results
                    for (let element of data) {
                        if (element.type === 'Trailer') return element.key 
                        else if (element.type === 'Teaser') return element.key 
                        else if (element.type === 'Clip') return element.key 
                    }      
                })
            }
        })
}