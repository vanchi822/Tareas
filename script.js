var create = document.querySelector("#Create");
var start = document.querySelector("#Start");
var pause = document.querySelector("#Pause");
var resume = document.querySelector("#Resume");
var reinicio = document.querySelector("#Reinicio");

//Variables globales
var Matriz = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
/**
 * 0 -> Vacio
 * 1 -> Basura
 * 2 -> Aspiradora
 * 3 -> Visitado
 */

var nbasura; //numero de basura que hay en el Matriz
var contadorBasura;
var aspiradora_X = 0; //coordenadas de la aspiradora
var aspiradora_Y = 0; //coordenadas de la aspiradora
tamanioMatriz = 12;

var banderaActiva = true;

var tl = gsap.timeline(); //Variable que se encargara de mover la aspiradora, checa la pagina https://greensock.com/docs/v3/GSAP/gsap.to()

//Funcion que crea la basura en la matriz
function iniciar_basura_aspiradora() {
    var cuadro;
    var i = 0;
    var num1 = 0;
    var num2 = 0;
    nbasura = Math.floor(Math.random() * 10) + 15;
    while (i < nbasura) {
        num1 = Math.floor(Math.random() * tamanioMatriz);
        num2 = Math.floor(Math.random() * tamanioMatriz);
        if (Matriz[num1][num2] == 0) { //checamos si ya hay un numero asignado en esa matriz
            if (i == (nbasura - 1)) { //asigna la aspiradora
                Matriz[num1][num2] = 2;
                aspiradora_X = num1; //las pocisiones en las que estara la aspiradora
                aspiradora_Y = num2;
                aspiradoraimg = $("#c" + num1 + "-" + num2);
                aspiradoraimg.addClass("img2"); //agregamos la clase con la imagen "aspiradora" en el cuadro
            } else { //asigna la basura
                Matriz[num1][num2] = 1;
                cuadro = $("#c" + num1 + "-" + num2); //asignamos la id del cuadro
                cuadro.addClass("img"); //agregamos la clase con la imagen "basura" en el cuadro
            }
            i++;
        }
    }
    console.log(Matriz); //imprime el Matriz
}

//Funcion que limpia la matriz
function limpiar_matriz() {
    var cuadro;
    for (let i = 0; i < tamanioMatriz; ++i) {
        j = 0;
        for (let j = 0; j < tamanioMatriz; ++j) {
            if (Matriz[i][j] == 1) {
                Matriz[i][j] = 0;
                cuadro = $("#c" + i + "-" + j);
                cuadro.removeClass("img"); //removemos la clase que contiene la imagen
            } else if (Matriz[i][j] == 2) {
                Matriz[i][j] = 0;
                cuadro = $("#c" + i + "-" + j);
                cuadro.removeClass("img2");
                Matriz[i][j] = 0;
            }
        }
    }
    console.log(Matriz);
    nbasura = 0;
}

//checa si en esa casilla hay basura
function validarCasilla(x, y) { // "x" y "y" son variables enteros
    var cuadro;
    if (Matriz[x][y] = 1) {
        cuadro = $("#c" + x + "-" + y);
        cuadro.removeClass("img"); //removemos la clase
        cuadro.addClass("img2");
        Matriz[x][y] = 0; //limpiamos el Matriz 
    }
}

function inicia_busqueda() {
    setTimeout(function() {
        console.log(aspiradora_X + " " + aspiradora_Y);
        let cuadro = $("#c" + aspiradora_X + "-" + aspiradora_Y);
        cuadro.removeClass("img2");
        while (1) {
            console.log(aspiradora_X + " " + aspiradora_Y);
            let aux = Math.floor(Math.random() * 4);
            let x = aspiradora_X,
                y = aspiradora_Y;
            switch (aux) {
                case 0: //Arriba
                    x = aspiradora_X - 1;
                    break;
                case 1: //Derecha
                    y = aspiradora_Y + 1;
                    break;
                case 2: //Abajo
                    x = aspiradora_X + 1;
                    break;
                case 3: //Izquierda
                    y = aspiradora_Y - 1;
                    break;
            }
            if (x >= 0 && x < tamanioMatriz && y >= 0 && y < tamanioMatriz) {
                aspiradora_X = x;
                aspiradora_Y = y;
                break;
            }
        }
        cuadro = $("#c" + aspiradora_X + "-" + aspiradora_Y);
        if (Matriz[aspiradora_X][aspiradora_Y] == 1) {
            ++contadorBasura;
            Matriz[aspiradora_X][aspiradora_Y] = 0;
            cuadro.removeClass("img");
        }
        cuadro.addClass("img2");
        if (banderaActiva) inicia_busqueda();
    }, 1000);
}
//----------------------Detecta los botones--------
create.onclick = () => {
    limpiar_matriz();
    iniciar_basura_aspiradora();
    reinicio.removeAttribute("disabled");
    start.removeAttribute("disabled");
    contadorBasura = 0;
}

start.onclick = () => {
    pause.style.display = 'inline';
    start.style.display = 'none';
    create.setAttribute("disabled", "");
    banderaActiva = true;
    inicia_busqueda();
}

pause.onclick = () => {
    resume.style.display = "inline";
    pause.style.display = "none";
    banderaActiva = false;
}

resume.onclick = () => {
    pause.style.display = "inline";
    resume.style.display = "none";
    banderaActiva = true;
    inicia_busqueda();
}

reinicio.onclick = () => {
    limpiar_matriz();
    M[aspiradora_X][aspiradora_Y] = 1;
    create.removeAttribute("disabled");
    reinicio.setAttribute("disabled", "");
    start.setAttribute("disabled", "");
    start.style.display = "inline";
    resume.style.display = "none";
    pause.style.display = "none";
    banderaActiva = false;
}