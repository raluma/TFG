const apiURL = 'http://antony.labfp.es/api/';

export async function getUser(user, password) {
    const sentenceName = apiURL + `get/user/name`
    const sentenceEmail = apiURL + `get/user/email`

 

    if (user.includes('@')) {

        const response = fetch(sentenceEmail, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email: user})
        }).then(res => res.json())
            .then(response => {
                let result = "";
                response.length > 0 ?
                    result = response
                    : result = [{ ID: '', NOMBRE: '', CORREO: '', CONTRASENA: '' }]
                return result
            })

     

        return response.then(response => {
            if (response[0].CORREO === user) {
                if (response[0].CONTRASENA === password) {
                    return { 
                        value: 'true',
                        message: 'todo va bien' ,
                        id: response[0].ID ,
                        username: response[0].NOMBRE
                        }
                } else {
                    return { value: 'false', message: 'No coincide la contraseña' }
                }
            } else {
                return { value: 'false', message: 'El correo no exite' }
            }
        })

    } else {

        const response = fetch(sentenceName, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name: user})
        }).then(res => res.json())
            .then(response => {
           
                let result;
                response.length > 0 ?
                    result = response
                    : result = [{ ID: '', NOMBRE: '', CORREO: '', CONTRASENA: '' }]
                return result
            })


        return response.then(response => {
            if (response[0].NOMBRE === user) {
                if (response[0].CONTRASENA === password) {
                    return { 
                        value: 'true',
                        message: 'todo va bien' ,
                        id: response[0].ID ,
                        username: response[0].NOMBRE
                        }
                } else {
                    return { value: 'false', message: 'No coincide la contraseña' }
                }
            } else {
                return { value: 'false', message: 'El nombre de usuario no existe' }
            }
        })
    }
}

export function validateRegister(params) {
    const username = params.username
    const email = params.email
    const password = params.password
    const password2 = params.password2

    if (username.length < 1 &&
        email.length < 1 &&
        password.length < 1 &&
        password2.length < 1) {
        return { value: false, message: 'Los campos no pueden estar vacio.' }
    } else if (username.includes('@')) {
        return { value: false, message: 'El usuario no debe contener el caracter: @' }
    } else if (!email.includes('@') || email < 5) {
        return { value: false, message: 'El email no es valido.' }
    } else if (password !== password2) {
        return { value: false, message: 'Las contraseñas no coinciden.' }
    } else if (password < 8) {
        return { value: false, message: 'Las contraseña no puede ser menor de 8 caracteres.' }
    }
    else {
        return { value: true, message: 'OK' }
    }

}

export async function insertUser(params) {
    const sentence = apiURL + `insert/user`

    return fetch(sentence, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    }).then(response => {
        return response.status === 200 ? 'true' : 'false'
    })
}

export async function insertFav(params) {
    const sentence = apiURL + `insert/fav/multimedia`

    return fetch(sentence, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    }).then(response => {
        return response.status === 200 ? 'true' : 'false'
    })
}

export async function deletetFav(params) {
    const sentence = apiURL + `delete/fav/multimedia`

    return fetch(sentence, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    }).then(response => {
        return response.status === 200 ? 'true' : 'false'
    })
}

export async function searchMultimediaFav(params) {
    const sentence = apiURL + `search/fav/multimedia`

    return fetch(sentence, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
        .then(response => {
            return response.length > 0 ? true : false
        })
}

export async function searchMultimediaList(params) {
    const sentence = apiURL + `search/list/multimedia`

    return fetch(sentence, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
        .then(response => {
            return response.length > 0 ? true : false
        })
}


export async function insertList(params) {
    const sentence = apiURL + `insert/list/multimedia`

    fetch(sentence, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    }).then(response => {
        return response.status === 200 ? 'true' : 'false'
    })
}

export async function deletetList(params) {
    const sentence = apiURL + `delete/list/multimedia`

    return fetch(sentence, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    }).then(response => {
        return response.status === 200 ? 'true' : 'false'
    })
}


export async function getMultimediaFav(params) {
    const sentence = apiURL + `get/fav/multimedia`

    return fetch(sentence, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
        .then(response => {
            return response
        })
}

export async function getMultimediaList(params) {
    const sentence = apiURL + `get/list/multimedia`

    return fetch(sentence, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
        .then(response => {
            return response
        })
}

export async function getProfile(params) {
    const sentence = apiURL + `get/user`

    return fetch(sentence, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
        .then(response => {
            return response
        })
}

export async function deleteUser(params) {
    const sentence = apiURL + `delete/user`

    return fetch(sentence, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    }).then(response => {
        return response.status === 200 ? 'true' : 'false'
    })
}

