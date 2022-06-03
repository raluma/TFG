const url = 'https://image.tmdb.org/t/p/original'


export default function getImage(poster_path) { 
    return poster_path === null ? '' : url+poster_path;
}
