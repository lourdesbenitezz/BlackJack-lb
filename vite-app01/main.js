import './style.css';
import _ from 'underscore';

//pueba con git github
//************** */
//variables globales
///************************* */

let deck                  = [];
let puntosJugador         =0;
let puntosComputadora     =0;
const tipos               = ['C','D','H','S'];
const especiales          = ['A','J','K','Q'];
const btnPedir            = document.querySelector ('#btnPedir');
const btnParar            = document.querySelector ('#btnParar');
const btnNuevo            = document.querySelector ('#btnNuevo')
const ptsJugador          = document.querySelector ('#ptsJugador');
const ptsComputadora      = document.querySelector ('#ptsComputadora')  
//div donde se encuentran las imagenes de las cartas del jugador
const divCartasJugador    = document.querySelector ('#player-cartas');
const divCartasComputadora= document.querySelector ('#computer-cartas');






//funciones
const crearDeck=()=>{
//creo el mazo con las cartas comunes
        for(let i= 2; i<=10; i++){
           for(let tipo of tipos){  //para simplificar y no poner cada "for" de cada letra
            deck.push(i+tipo)
           };
        };
//creo el mazo con las cartas especiales
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo)
            }
        }
        
        deck =_.shuffle(deck); //para mezclar el mazo con underscore

};

crearDeck();

const pedirCarta= () =>{
    let carta = deck.pop(); //extrae el ultimo elemento del arreglo y lo devuelve
    if(deck.length===0){
        throw 'NO HAY MÁS CARTAS EN EL MAZO';
    }
    return carta;
};

const valorCarta=(carta)=>{

    //extraer el valor de la carta
    let valor = carta.substring(0,carta.length-1); //2D -1 = 2; 10D - 1 = 10; AD - 1 = A
    let puntos = 0;
    
    if(isNaN(valor)){
        console.log('no es un número');
        if(valor === 'A'){
            puntos= 11;
        }
        else{//si no es A ya sabre que es J, K o Q
            puntos = 10;
        }
        // puntos= (valor === 'A')? 11 : 10; // ternario
    }else{
        console.log('es un numero');
        puntos= valor * 1;
    }
    return puntos;
};

const turnoComputadora =(puntosMinimos)=>{
    
    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        ptsComputadora.innerText = puntosComputadora;
        const imgCarta            = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src=`assets/cartas/${carta}.png`;
        divCartasComputadora.append(imgCarta);
        
        if(puntosMinimos>21)
            {
                break;
            };


    }while(puntosComputadora<puntosMinimos && (puntosMinimos<= 21) );

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :('); // si ambos puntos son = hay empate
        } else if( puntosMinimos > 21) {
            alert('Computadora gana'); //si yo hice más de 21 perdi
        } else if(puntosComputadora > 21 ) {
            alert('Jugador gana'); // si la computadora hizo mas de 21 gana
        } else {
            //si yo me detuve antes de 21 y la computadora tambien pero
            //y la computadora se acerco mas a 21
            alert('Computadora Gana')
        }
    }, 500);

};


//eventos

btnPedir.addEventListener('click',()=>{

    const carta= pedirCarta();
    puntosJugador= puntosJugador+ valorCarta(carta);
    ptsJugador.innerText =  puntosJugador;
    //<img class="carta" src="assets/cartas/10PC.png"></img>
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src=`assets/cartas/${carta}.png`;
    divCartasJugador.append(imgCarta);

    //controlar que el jugador llegue a 21 pts
    
    if(puntosJugador>21)
    {
        console.warn('perdiste');
        btnPedir.disabled= true;
        btnParar.disabled= true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador===21)
    {
        console.warn("turno de la computadora");
        btnPedir.disabled=true;
        btnParar.disabled= true;
        turnoComputadora(puntosJugador);
    };
});

btnParar.addEventListener('click', ()=>{

    btnPedir.disabled=true;
    btnParar.disabled=true;
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener('click', () =>{
    console.clear();
    deck = [];
    crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;

    ptsJugador.innerText     = 0;
    ptsComputadora.innerText = 0;
    
    divCartasComputadora.innerHTML ='';
    divCartasJugador.innerHTML     ='';

    btnPedir.disabled   = false;
    btnParar.disabled   = false;
});

