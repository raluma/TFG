import ListOfElements from '../../components/ListOfElements'
import Button from '../../components/Button'
import Menu from '../../components/Menu'
import { useHandleClickMovie } from '../../hooks/handleClickMovie'
import E404 from '../../components/404'


export default function SearchMovies({ params }) {
    const keyword = params
    const {handleClick, parameter} = useHandleClickMovie(keyword)

    const list = {
        'HOME': '/', 
        'MOVIES': `/search/movie/${params.keyword}`,
        'SERIES': `/search/serie/${params.keyword}`
    }

 
    return <div id='container' className={parameter.results.length >= 6 ? 'bg-zinc-900 h-full text-white flex flex-col items-center' :
    'bg-zinc-900 h-screen text-white flex flex-col items-center' }>
            <Menu list={list} orientation={'H'}/>

            {parameter.loading === true ?

                <div className='container flex justify-center items-center h-screen'>
                    <span class="loader" />
                </div>  
        
            : parameter.results.length === 0 ? 

                <div className='bg-[#1b1b1b] h-screen w-full 
                    relative flex justify-center items-center overflow-hidden'>
                    <E404 />
                </div>
            
            :
                <>
                    <div className='container'>
                        <ListOfElements element={parameter.results} />
                    </div>
                
                    {parameter.results.length >= 20 ? 
                        <div>
                            <Button handleClick={handleClick}>Más Películas</Button>
                        </div>
                        :
                        <> </>
                    }
                </>

            }
    </div>
}
    
