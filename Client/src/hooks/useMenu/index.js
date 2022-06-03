import { useEffect, useState } from 'react'

const listLogin ={
        'HOME': '/',
        'MOVIES': '/movie',
        'SERIES': '/serie',
        'LINEA': '/',
        'LOGIN': '/login'
}

const listProfile = {
        'HOME': '/',
        'MOVIES': '/movie',
        'SERIES': '/serie',
        'LINEA': '/',
        'PROFILE': '/profile'
      }

export function useMenu() {
  const [list, setList] = useState(listLogin)

    useEffect(() => {
        if (localStorage.getItem('IdSesion') !== null) setList(listProfile)
    }, [list])  

    return list
}