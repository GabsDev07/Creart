const URL = "http://127.0.0.1:5000/";

//Declaracion de variables
const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section");

btnLeft.addEventListener("click", e => moveToLeft());
btnRight.addEventListener("click", e => moveToRight());

let acumulador = 0,
    contador = 0,
    widthImg = 100/sliderSection.length;

//Declaracion de funciones
function moveToRight(){
    if(contador >= sliderSection.length-1){
        contador = 0;
        acumulador = 0;
        slider.style.transform = `translate(-${acumulador}%)`;
        slider.style.transition = "none";
    }else{
        contador++;
        acumulador = acumulador + widthImg;
        slider.style.transform = `translate(-${acumulador}%)`;
        slider.style.transition = "all ease .6s";
    }
}
function moveToLeft(){
    contador--;
    if(contador < 0){
        contador = sliderSection.length-1;
        acumulador = widthImg*contador;
        slider.style.transform = `translate(-${acumulador}%)`;
        slider.style.transition = "none";
    }else{
        acumulador = acumulador - widthImg;
        slider.style.transform = `translate(-${acumulador}%)`;
        slider.style.transition = "all ease .6s";
    }
}
setInterval(() => {
    moveToRight();
}, 3500);




//FUNCION DE BUSQUEDA
function buscar() {
    let b = document.getElementById("buscador");
    let s = b.value;

    if (s.trim() != '') {
        let j = 0;

        const resHead = document.getElementById("resultados-head");
        resHead.style.display = "flex"; 
        resHead.innerHTML = "Resultados de "+ s.trim() + " ("+ j +") :";

        //fetch("https://api.artic.edu/api/v1/artworks/search?q=" + s.trim())
        fetch(URL + "search/" + s.trim())
        .then(data => data.json())
        .then(datos => {
            console.log(datos)
            const lista = document.getElementById("resultados");
            
            while((i = lista.getElementsByTagName("li")).length > 0) {
                lista.removeChild(i[0]);
            }

            for (i in datos) {
                console.log(datos[i])
                //document.querySelector("body").innerHTML += `<img src="${datos.config.iiif_url+"/"+datos.data.image_id+"/full/150,/0/default.jpg"}" alt="Pintura">`
                const item = document.createElement("li")

		        item.innerHTML = `<div class="box-result">
                    <img class="img-result" style="grid-area: img;" src="static/img/${datos[i].imagen}" alt="Imagen"> 
                    <ul style="grid-area: data;list-style: none">
                        <li class="title-result">${datos[i].nombre}</li>
                        <li class="author-result">${datos[i].autor}</li>
                    </ul>
                </div>
                `;
                //item.className="box-result";
		        lista.appendChild(item);

                j++;
                resHead.innerHTML = "Resultados de "+ s.trim() + " ("+ j +") :";
                }
            })
        b.value="";
        }
    }

function tocarTecla() {
    if (event.keyCode == 13) {
        buscar();
        }
    }


    // Aqui empieza script para formulario
function validarEnviar() {

    if (document.formulario.nombre.value.length <= 2) {
        alert("Ingrese un nombre correcto")
        document.formulario.nombre.focus()
        return
        }
    
    let edadNumero = parseInt(document.formulario.edad.value)
    if (isNaN(edadNumero)) {
        alert("Ingrese una edad valida")
        document.formulario.edad.focus()
        return
        }
    else if (edadNumero < 18 || edadNumero > 85) {
        alert("Tiene que ser mayor de edad y menor de 85 años")
        document.formulario.edad.focus()
        return
        }
    
    let dniNumero = parseInt(document.formulario.dni.value)
    if (isNaN(dniNumero)) {
        alert("Ingrese un DNI valido")
        document.formulario.dni.focus()
        return
        }
    else if (document.formulario.dni.value.length != 8) {
        alert("El DNI tiene que tener 8 numeros")
        document.formulario.dni.focus()
        return
        }
    
    if (document.formulario.razon.selectedIndex == 0) {
        alert("Seleccione la razon para registrarse")
        document.formulario.razon.focus()
        return
        }
    
    alert("Gracias por completar el formulario!")
    document.formulario.submit()
    }

//MOSTRAR OBRAS RANDOM EN CARD

fetch(URL + 'productos')
    .then(function (response) {
        if (response.ok) {
            return response.json();
            } 
        else {
            throw new Error('Error al obtener los productos.');
            }
        })
        .then(function (data) {
            let cards = document.getElementsByClassName("obra_random")
            
            i = 0;

            for (i in cards) {
                var ind = Math.floor(Math.random()*data.length);
                //cards[i].src = 'static/img/' + data[ind].imagen;

                const item = document.createElement("li")

		        item.innerHTML = `
                <ul style="list-style: none; padding: 0px;">
                    <li>
                        <img class="img-result" style="grid-area: img;" src="static/img/${data[ind].imagen}" alt="Imagen">
                    </li>
                    <li class="title-result">${data[ind].nombre}</li>
                    <li class="author-result">${data[ind].autor}</li>
                </ul>
                `;
                //item.className="box-result";
		        cards[i].appendChild(item);
                }
            })
        .catch(function (error) {
            console.error('Error:', error);
            })

// FORMULARIO PARA MODIFICAR OBRAS
/*
document.getElementById('modificar_obra').addEventListener('submit', function(event) {
    event.preventDefault();

    var codigo = document.getElementById('codigo_modificar').value;
    var nombre = document.getElementById('nombre_modificar').value;
    var autor = document.getElementById('autor_modificar').value;
    var nuevaImagen = document.getElementById('imagen_modificar').files[0];
    var cambiarImagen = document.getElementById('cambiar_imagen').checked;

    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('autor', autor);
    formData.append('imagen', nuevaImagen);
    //if (nuevaImagen && cambiarImagen) {
    //}

    fetch(URL + 'productos/' + codigo, {
        method: 'PUT',
        body: formData
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al modificar.');
        }
    })
    .then(function() {
        alert('Modificado correctamente.');
        document.getElementById('codigo_modificar').value = '';
        document.getElementById('nombre_modificar').value = '';
        document.getElementById('autor_modificar').value = '';
        document.getElementById('imagen_modificar').value = '';
        document.getElementById('cambiar_imagen').checked = false;
    })
    .catch(function(error) {
        alert('Error al modificar.');
        console.error('Error:', error);
    });
});*/


