/**
 * Nota para Ivan:
 * Las funcions de poner la basuta y la aspiradora en la matriz, validar casilla,  ya estan definias con variables
 * globales. Nadamas no se como sincronizar las acciones que se le da la matriz junto con lo que se muestra en 
 * la pantalla
 * 
 */



var start = document.querySelector("#Start");
var stops = document.querySelector("#Stop");
var resume = document.querySelector("#Resume");
var delet = document.querySelector("#Delete");

//Variables globales
var Arreglo= 
[[0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0,0,0,0]];
/**
 * 0 -> No trae nada
 * 1 -> Basura
 * 2 -> Aspiradora
 */

var nbasura; //numero de basura que hay en el arreglo
var aspiradoraimg; //contiene los datos del ID asignado
var aspiradoramov; //contiene el ID en donde esta la aspiradora
var aspiradora_X=0;  //coordenadas de la aspiradora
var aspiradora_Y=0; //coordenadas de la aspiradora

var movAspiradoraX; // se encargan de guardar la poscicion para mover la aspiradora(interfaz)
var movAspiradoraY; // se encargan de guardar la poscicion para mover la aspiradora (interfaz)

var tl = gsap.timeline(); //Variable que se encargara de mover la aspiradora, checa la pagina https://greensock.com/docs/v3/GSAP/gsap.to()

//Funcion que crea la basura en la matriz
function iniciar_basura_aspiradora(){  
    var cuadro;
    var i = 0;
    var num1 = 0;
    var num2 = 0;
    while (i < 13){
        num1 = Math.floor(Math.random()*12); 
        num2 = Math.floor(Math.random()*12);
        if(Arreglo[num1][num2] != 1){ //checamos si ya hay un numero asignado en esa matriz
            if(i == 12){ //asigna la aspiradora
                Arreglo[num1][num2] = 2;
                aspiradora_X = num1; //las pocisiones en las que estara la aspiradora
                aspiradora_Y = num2;
                movAspiradoraX = 0; //inicia las variables para mover la aspiradora
                movAspiradoraY = 0;
                i++;
                //-------Interfas
                aspiradoramov = "#d"+num1+"-"+num2;
                aspiradoraimg = $("#d"+num1+"-"+num2);
                aspiradoraimg.addClass("img2");    //agregamos la clase con la imagen "aspiradora" en el cuadro
                //-------Fin interfaz
            }
            else{   //asigna la basura
            Arreglo[num1][num2] = 1;
            i++;
            //-------Interfas
            cuadro = $("#c"+num1+"-"+num2); //asignamos la id del cuadro
            cuadro.addClass("img");    //agregamos la clase con la imagen "basura" en el cuadro
            //-------Fin interfaz
            }
        }
    }
    basura = 12;
    console.log(Arreglo); //imprime el arrego
}

//Funcion que limpia la matriz
function lipiar_matriz(){

    var cuadro;
    var i = 0;
    var j = 0;
    while(i < 12){
        j = 0;
        while (j < 12){
            if(Arreglo[i][j] == 1){
                Arreglo[i][j] = 0;

                //Interfas
                cuadro = $("#c"+i+"-"+j);
                cuadro.removeClass("img"); //removemos la clase que contiene la imagen
                //Fin interfaz
            }
            j++;
        }
        i++;
    }
    Arreglo[aspiradora_X][aspiradora_Y]=0;
    aspiradoraimg.removeClass("img2");
    console.log(Arreglo);
    basura = 0;

/* Quise verme macho con esto XDD
    Arreglo = Arreglo.map((A1)=>{
        return A1.map((A2) =>{
            return 0;
        });
    });
*/
}
//checa si en esa casilla hay basura
function validarCasilla(x,y){ // "x" y "y" son variables enteros
    var cuadro;
    if(x < 12 && y <12){
        if(Arreglo[x][y] = 1){
            cuadro = $("#c"+x+"-"+y);
            cuadro.removeClass("img"); //removemos la clase
            Arreglo[x][y] = 0; //limpiamos el arreglo 
        }
    }
    else{
        console.log("Validar casilla: Cordenadas fuera de la matriz")
    }
}


function moverAspiradora(direccion){ //direccion de la aspiradora que va a tomar
    switch(direccion){
        case 1://Arriba
            movAspiradoraY = movAspiradoraY-45;
            console.log("1 inicio")
            tl.to(aspiradoramov,{duration:0.2,y:movAspiradoraY}); //mueve la aspiradora
            console.log("1 fin")
            break;
        case 2://Derecha
            movAspiradoraX = movAspiradoraX+45;
            console.log("2 inicio")
            tl.to(aspiradoramov,{duration:0.2,x:movAspiradoraX});
            console.log("2 fin")
            break;
        case 3://Abajo
            movAspiradoraY = movAspiradoraY+45;
            console.log("3 inicio")
            tl.to(aspiradoramov,{duration:0.2,y:movAspiradoraY});
            console.log("3 fin")
            break;
        case 4://Izquierda
            movAspiradoraX = movAspiradoraX-45;
            console.log("4 inicio")
            tl.to(aspiradoramov,{duration:0.2,x:movAspiradoraX});
            console.log("4 fin")
            
            break;
    }
}



//----------------------Detecta los botones
start.onclick = () => {
    iniciar_basura_aspiradora();
}
//-------- no se si poner estos botones o no
stops.onclick = () => {
}

resume.onclick = () => {
}

delet.onclick = () => {
    lipiar_matriz();
}
