import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faLongArrowAltLeft } from '@fortawesome/fontawesome-free-solid'
import TextField from '@mui/material/TextField';
import * as db from '../../services/db_funtion';
import "./index.css";
import { useLocation } from 'wouter'

export default function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [view, setView] = useState(true)
    const [view2, setView2] = useState(true)
    const [, pathLocation] = useLocation()

    const handleView = () => {
        setView(!view)
    }

    const handleView2 = () => {
        setView2(!view2)
    }


    const handleClick = () => {
        window.history.back()
    }

    const handleSubmit = e => {
        e.preventDefault()

        const params = { username, email, password, password2 }

        const validate = db.validateRegister(params)

        if (validate.value) {

            db.insertUser(params).then(response => {
                if (response === 'true') {
                    alert('El Usuario ha sido creado con éxito')
                    pathLocation("/login")
                } else {
                    alert('El usuario o correo eléctronico ya esta en uso')
                }
            })

        } else alert(validate.message)
    }

    // '& label.Mui-focused': {
    //     color: 'green',
    //   },
    //   '& .MuiInput-underline:after': {
    //     borderBottomColor: 'green',
    //   },
    //   '& .MuiOutlinedInput-root': {
    //     '& fieldset': {
    //       borderColor: 'red',
    //     },
    //     '&:hover fieldset': {
    //       borderColor: 'yellow',
    //     },
    //     '&.Mui-focused fieldset': {
    //       borderColor: 'green',
    //     },

    return <div className='h-screen flex flex-col bg-zinc-900 bg-profile bg-cover'>

        <section className='w-full h-12 flex items-center  '>
            <div className='w-10 flex items-center text-zinc-100 hover:cursor-pointer absolute left-6'
                onClick={handleClick}>
                <FontAwesomeIcon icon={faLongArrowAltLeft} className='h-10 ' />
                <p className='h-10 flex items-center px-3'>ATRAS</p>
            </div>

        </section>

        <section className=' h-screen flex justify-center items-center'>

            <div className='bg-zinc-800/70 -translate-y-10 p-6 h-96 w-72 rounded-3xl shadow-2xl backdrop-blur-md'>

                <form className=' flex flex-col items-center font-Montserrat ' onSubmit={handleSubmit}>

                    <div className='mb-4 flex flex-col'>
                        <TextField
                             sx={{
                                input: { color: 'white' },

                                label: { color: 'black' },

                                '& label.Mui-focused': {
                                    color: 'red'
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'black',
                                },
                                '&:hover .MuiInput-underline:after': {
                                    borderBottomColor: 'red',
                                },

                            }}

                            type="text" label="Usuario" id="standard-basic"
                            variant="standard" name='username' value={username}
                            onChange={e => setUsername(e.target.value)} />
                    </div>

                    <div className='mb-4 flex flex-col'>
                        <TextField

                            sx={{
                                input: { color: 'white' },

                                label: { color: 'black' },

                                '& label.Mui-focused': {
                                    color: 'red'
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'black',
                                },
                                '&:hover .MuiInput-underline:after': {
                                    borderBottomColor: 'red',
                                },

                            }}



                            label="Correo" id="standard-basic" variant="standard" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className='mb-4 flex flex-col relative'>
                        <TextField

                            sx={{
                                input: { color: 'white' },

                                label: { color: 'black' },

                                '& label.Mui-focused': {
                                    color: 'red'
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'black',
                                },
                                '&:hover .MuiInput-underline:after': {
                                    borderBottomColor: 'red',
                                },

                            }}

                            type={view ? 'password' : 'text'}
                            label="Contraseña" id="standard-basic" variant="standard" 
                            name='password' value={password} 
                            onChange={e => setPassword(e.target.value)} />
                            <span className='absolute top-5 right-0'>
                                <FontAwesomeIcon className='hover:cursor-pointer' icon={view ? faEye : faEyeSlash} 
                                onClick={handleView}/>
                            </span>
                    </div>

                    <div className='mb-4 flex flex-col relative'>
                        <TextField

                            sx={{
                                input: { color: 'white' },

                                label: { color: 'black' },

                                '& label.Mui-focused': {
                                    color: 'red'
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'black',
                                },
                                '&:hover .MuiInput-underline:after': {
                                    borderBottomColor: 'red',
                                },

                            }}

                            type={view2 ? 'password' : 'text'}
                            label="Repetir contraseña" id="standard-basic" variant="standard" 
                            name='password' value={password2} 
                            onChange={e => setPassword2(e.target.value)} />
                            <span className='absolute top-5 right-0'>
                                <FontAwesomeIcon className='hover:cursor-pointer' icon={view2 ? faEye : faEyeSlash} 
                                onClick={handleView2}/>
                            </span>
                    </div>

                    <div className='w-full'>
                        <input className='bg-red-600 border-2 border-red-600 font-bold w-full 
                        rounded-lg hover:cursor-pointer hover:bg-zinc-900  hover:text-red-500'
                            type="submit" name='submit' value='Crear' />
                    </div>
                </form>
                <div className=' text-center my-5'>
                    <a href="/login" className='font-Montserrat font-bold hover:text-zinc-200'> Ya tienes una cuenta?</a>
                </div>
            </div>

        </section>

    </div>
}