//Mismo proyecto pero con clases en vez de prototypes

//Constructor para calcular el seguro
class Seguro {

    constructor(marca,anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
    }
    cotizarSeguro(){
        /*
        Valores sobre los que se multiplica según el tipo de seguro
        1 = americano 1.15
        2 = asiático 1.05
        3 = europeo 1.45
        */

        let cantidad;
        const base = 2000; //Base que se sugiere en el video

        switch (this.marca) {
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.45;
                break;
        }

        //Como leer el anio
        const diferencia = new Date().getFullYear() - this.anio;
        //Por cada anio de diferencia hay que reducir un 3% el valor del seguro
        cantidad -= ((diferencia * 3) * cantidad) / 100;
        /*
        Si el seguro es básico se multiplica por 30% más
        Si el seguro es completo se multiplica por 50% más
        */
        if (this.tipo === 'basico') {
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }
        return cantidad.toFixed(2);
    }
}


//Constructor de lo que se muestra
class Interfaz{ 
    //Mensaje que se imprime en el HTML
    mostrarError(mensaje, tipo){
        const div = document.createElement('div');

        if (tipo === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group')
        );

        setTimeout(function () {
            document.querySelector('.mensaje').remove();
        }, 2000);

    }
    //Muestra el resultado de la cotización
    mostrarResultado(seguro, cantidad) {
        const resultado = document.getElementById('resultado');

        let marca;

        switch (seguro.marca) {
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }
        //Crear un div como cartel
        const div = document.createElement('div');
        //Insertar información
        div.innerHTML = `
        <p class= 'header'> Tu Seguro: </p>
        <p> Marca: ${marca}</p>
        <p> Año: ${seguro.anio}</p>
        <p> Tipo: ${seguro.tipo}</p>
        <p> Total: ${cantidad}</p>
    `;

        let spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function () {
            //Para que luego de los 2 segundos se oculte el spinner y aparezca el resultado
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 2000);
    }
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
        //Limpiar formulario de resultados anteriores
        const resultados = document.querySelector('#resultado div');

        if (resultados != null) {
            resultados.remove();
        }
        //Instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);

        //Cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);

        //Mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        //console.log(cantidad);
        //console.log('Funciona bien');
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
