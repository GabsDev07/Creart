// FORMULARIO PARA MODIFICAR OBRAS
const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            nombre: '',
            autor: '',
            imagen_url: '',
            mostrarDatosProducto: false,
            };
        },
    methods: {
        obtenerProducto() {
            fetch(URL + 'productos/' + this.codigo)
            .then(response => {
                if (response.ok) {
                    return response.json()
                    } 
                else {
                    throw new Error('Error al obtener los datos del producto.')
                    }
                })
            .then(data => {
                this.nombre = data.nombre;
                this.autor = data.autor;
                this.imagen_url = data.imagen_url;
                this.mostrarDatosProducto = true;
                })
            .catch(error => {
                console.log(error);
                alert('Código no encontrado.');
                })
            },
        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
            },
        guardarCambios() {
            const formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('nombre', this.nombre);
            formData.append('autor', this.autor);
            formData.append('imagen', this.imagenSeleccionada,this.imagenSeleccionada.name);
            
            fetch(URL + 'productos/' + this.codigo, {
                method: 'PUT',
                body: formData,
                })
            .then(response => {
                if (response.ok) {
                    return response.json()
                    } 
                else {
                    throw new Error('Error al guardar los cambios del producto.')
                    }
                })
            .then(data => {
                alert('Producto actualizado correctamente.');
                this.limpiarFormulario();
                })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar el producto.');
                });
            },

        eliminar() {
            fetch(URL + 'productos/' + this.codigo, {
                method: 'DELETE'
            })
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al eliminar.');
                }
            })
            .then(function() {
                alert('Eliminado correctamente.');
                this.limpiarFormulario();
            })
            .catch(function(error) {
                alert('Error al eliminar.');
                console.error('Error:', error);
            });
            },

        limpiarFormulario() {
            this.codigo = '';
            this.nombre = '';
            this.autor = '';
            this.imagen_url = '';
            this.imagenSeleccionada = null;
            this.mostrarDatosProducto = false;
            }
        }
});
app.mount('#app');

// FORMULARIO PARA ELIMINAR OBRAS

/*
document.getElementById('eliminar_obra').addEventListener('submit', function(event) {
    event.preventDefault();

    var codigo_eliminar = document.getElementById('codigo_eliminar').value;

    fetch(URL + 'productos/' + codigo_eliminar, {
        method: 'DELETE'
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al eliminar.');
        }
    })
    .then(function() {
        alert('Eliminado correctamente.');
        document.getElementById('codigo_eliminar').value = '';
    })
    .catch(function(error) {
        alert('Error al eliminar.');
        console.error('Error:', error);
    });
});*/