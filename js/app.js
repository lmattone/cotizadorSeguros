//Constructor para calcular el seguro
function Seguros(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;

}

//Constructor de lo que se muestra
function Interfaz() { }

//Mensaje que se imprime en el HTML
Interfaz.prototype.mostrarError = function (mensaje, tipo) {
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList = 'error';
    } else {
        div.classList = 'correcto';
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group')
    );

    setTimeout(function () {

    }, 3000);

}

//EventListener

const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    //leer la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //leer el anio seleccionado del select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //leer el tipo de seguro
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //crear instancia de Interfaz
    const interfaz = new Interfaz();

    //REvisamos que los campos no estén vacíos
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
        //Interfaz imprimiendo un error
        interfaz.mostrarError('Faltan datos, debe revisar el formulario y probar de nuevo', 'error');
    } else {
        //Instanciar seguro y mostrar interfaz
        console.log('Funciona bien');
    }

    /*console.log(tipo);
    console.log(anioSeleccionado);
    console.log(marcaSeleccionada);
    console.log('presionado');*/
});

//Código para que aparezcan las opciones de año de los autos
const max = new Date().getFullYear(),
    min = max - 20; // el -20 es porque según política de la empresa cubre autos con 20 años de antiguedad

const selectAnios = document.getElementById('anio');

for (let i = max; i > min; i--) { // es así para que aparezca del 2020 para abajo
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}
git 