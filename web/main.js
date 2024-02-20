const REMOTE = "http://localhost:8000/"
var f = document.getElementById('autentificacion')
var c = document.getElementById('contenido')

async function obtenerListado(token){
    var listado = await fetch(
        REMOTE+'api/actores/',
        {
            headers:{
                'Authorization': 'Token ' + token,
            },
        }
    ).then(
        response => response.json()
    ).then(data => {
        return data
    })
    return listado
}

f.addEventListener('submit', (e)=>{
    var u = document.getElementById('username').value
    var p = document.getElementById('password').value
    e.preventDefault()
    c.innerHTML = ''
    fetch(
        REMOTE+'api-token-auth/',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:`username=${u}&password=${p}`,
        }
    )
    .then(
        response => response.json()
    )
    .then(data => {
        if(data['token'] != undefined){
            return data['token']
        } else {
            // mostrar error UI
            var error = document.createElement("p")
            error.innerHTML = 'Error en credenciales'
            error.style = 'color: red'
            c.appendChild(error)
            return Promise.reject();
        }
    }).then(
        token => {
            datos = obtenerListado(token)
            console.log(datos)
            f.style.display = 'none';
            datos.then(
                datos => {
                    for(var d of datos) {
                        var dContainer = document.createElement("p")
                        dContainer.innerHTML = d['nombre']
                        c.appendChild(dContainer)
                    }
                }
            )
        }
    )
})