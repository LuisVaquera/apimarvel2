/*Se crea variable de boton para darle funcionamiento*/
let btn1 = document.getElementById('btn1');
/*constantes para la llave publica y privada de la API*/
const privatekey = 'c3495e5039fe4d8d19960ad26ed801549c164940',
      publickey = '59e88dfe4e6d3c0784a670c75e15cfc0',
/*Contenedor donde se mostraran las imagenes*/
      content = document.getElementById('content');

/*Metodo para realizar la coneccion*/
    const getConnection = () => {
/*Creacion de constante ts*/
    const ts = Date.now(),
/*Llamada al algoritmo MD5/ Generara una variable donde se junten las constantes ts, llave privada y llave publica*/
    hash = MD5(ts + privatekey + publickey),
/*URL donde se realizara la peticion*/
        URL= `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publickey}&hash=${hash}`;
/*Verificacion de que la promesa sea correcta*/    
    fetch(URL)
/*Utilizamos metodo json que traera la data y la va formatear en json*/
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                drawHero(e);
            });
        });
    };


    

const drawHero = e => {
    const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`
/*Se obtiene la data segun la documentacion de MARVEL*/
    const hero = `
    <div class="col mb-4">
    <div class="card h-100">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
            <div class="p-3 mb-2 bg-danger text-white">
                <h5 class="card-title">${e.name}</h5>
            </div>
            <div class="p-3 mb-2 bg-dark text-white" class="card-body">
                <p class="card-text">${e.description}</p>
            </div>
      </div>
    </div>  
     `;
    
     content.insertAdjacentHTML('beforeEnd',hero);
};
/*Cuando se clikee el boton se realizara lo siguiente*/
btn1.addEventListener('click', ()=>{
/*Se realizara la coneccion*/
    getConnection();
});




