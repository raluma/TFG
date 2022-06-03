import ListOfElements from '../../components/ListOfElements'
import Button from '../../components/Button'
import { useHandleClickSeries } from '../../hooks/handleClickSeries'
import Menu from '../../components/Menu'
import E404 from '../../components/404'


export default function SearchSeries({ params }) {
    const keyword  = params
    const {handleClick, parameter} = useHandleClickSeries(keyword)
    
    const list = {
        'HOME': '/', 
        'MOVIES': `/search/movie/${params.keyword}`,
        'SERIES': `/search/serie/${params.keyword}`,
    }
    

    return <div id='container' className={parameter.results.length >= 6 ? 'bg-zinc-900 h-full text-white flex flex-col items-center' :
    'bg-zinc-900 h-screen text-white flex flex-col items-center' }>
            <Menu list={list} orientation={'H'}/>

            {parameter.loading === true ?

                <div className='container flex justify-center h-screen items-center'>
                    <span className="loader" />
                </div>  
        
            : parameter.results.length === 0 ? 

                <div className='bg-[#1b1b1b] h-screen w-full 
                    relative flex justify-center items-center overflow-x-hidden'>
                    <E404 />
                </div>
            
            :
                <>
                    <div className='container'>
                        <ListOfElements element={parameter.results} />
                    </div>
                
                    {parameter.results.length >= 20 ? 
                        <div>
                            <Button handleClick={handleClick}>Más Series</Button>
                        </div>
                        :
                        <> </>
                    }
                </>

            }
    </div>
}
    
