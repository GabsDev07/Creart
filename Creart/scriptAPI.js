

fetch('https://www.wikiart.org/en/Api/2/login?accessCode=[0efab78032c24a7c]&secretCode=[91c94eef3968a53c]', {
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
})
.then(response => response.json())
.then(data => {
  // Procesa y muestra los datos de la API
})
.catch(error => {
  console.error('Error al obtener los datos de la API:', error);
});
        