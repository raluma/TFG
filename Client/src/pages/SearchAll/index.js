import ListOfElements from '../../components/ListOfElements'
import Button from '../../components/Button'
import Menu from '../../components/Menu'
import { useHandleClickAll } from '../../hooks/handleClickAll'
import { useLocation } from 'wouter'

localStorage.setItem('url',window.location.href);


export default function SearchAll({ params }) {
    const keyword = params
    const [, pathLocation] = useLocation()
    const {handleClick, parameter} = useHandleClickAll(keyword)

    const list = {
        'HOME': '/', 
        'MOVIES': `/search/movie/${params.keyword}`,
        'SERIES': `/search/serie/${params.keyword}`
    }
    
    return <div id='container' className={parameter.results.length >= 6 ? 'bg-zinc-900 h-full text-white flex flex-col items-center' :
    'bg-zinc-900 h-screen text-white flex flex-col items-center' }>
            <Menu list={list} orientation={'H'} />

            {parameter.loading === true ?

                <div className='container flex justify-center items-center h-screen'>
                    <span className="loader  " />
                </div>   
        
            : parameter.results.length === 0 ? 
                pathLocation('/404')
            :
                <>
                    <div className='container'>
                        <ListOfElements element={parameter.results} />
                    </div>
                    {parameter.results.length >= 20 ? 
                        <div>
                            <Button handleClick={handleClick}>Más Contenido</Button>
                        </div>
                        :
                        <> </>
                    }
                </>

            }
    </div>
}
    
