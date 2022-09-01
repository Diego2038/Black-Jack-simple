/**
 *  2C = Two of Clubs (Tréboles)
 *  2D = Two of Diamonds (Diamantes)
 *  2H = Two of Hearts (Corazones)
 *  2S = Two of Spades (Espadas)
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

// Esta función crea una nueva baraja
const crearDeck = () => {
    for(let tipo of tipos){
        for (let i=2; i <= 10; i++) {
            deck.push( i + tipo);
        };
        for (let j in especiales){
            deck.push(especiales[j] + tipo);
        };
    };
    // console.log(deck);
    deck = _.shuffle(deck);
    return deck;
}

deck = crearDeck();
console.log("---");
// Esta función permite tomar una carta
const pedirCarta = () => {
    if (deck.length==0){
        throw 'No hay cartas en el deck';
    };
    let carta = deck.pop();
    return carta;
}; 
// pedirCarta();

// Función que se encarga de obtener el valor de una carta
const valorCarta = ( carta ) => {
    // let valorParcial = carta.slice(0,-1);
    let valorParcial = carta.substring(0, carta.length - 1); // Es equivalente
    // console.log(valorParcial);
    return ( isNaN( valorParcial ) ) ?
           ( valorParcial=='A') ? 11 : 10
           : valorParcial * 1;
    /*
    switch(valorParcial){
        case 'A':
            valorParcial = 1;
            break;
        case 'J':
            valorParcial = 11;
            break;
        case 'Q':
            valorParcial = 12;
            break;
        case 'K':
            valorParcial = 13;
            break;
    }; // son equivalentes
    */
   
   // Otra opción: 
   /*
   valorParcial = (valorParcial=='A') ? 11 :
                  (valorParcial=='J') ? 10 :
                  (valorParcial=='Q') ? 10 :
                  (valorParcial=='K') ? 10 : NaN;
    return parseInt(valorParcial);
    */
};

////////////////////////

let puntosJugador = [0],
    puntosComputadora = [0];

const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');

const divCartasComputadora = document.querySelector('#computadora-cartas');

const reiniciarBarajaYPuntos = () => {
    console.clear();
    puntosJugador[0] = 0;
    puntosComputadora[0] = 0;
    deck = crearDeck();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    puntosHTML[0].innerText = '0';
    puntosHTML[1].innerText = '0';
};

// Función que se encarga en determinar quién gana a partir de los puntos
const determinarGanador = (puntosJug,puntosPC) => {
    setTimeout(() => {
        return (puntosJug > 21) ? alert('PC gana') 
    : ( puntosPC > 21 ) ? alert('Persona gana')
    : ( puntosJug === puntosPC ) ? alert('empate')
    : ( puntosJug > puntosPC ) ? alert('Persona gana')
    : alert('PC gana');
    // Lo que esté adentro de esta función flecha se ejecuta después de del tiempo determinado (está en ms)
    },100);
};

// Función que se encarga de realizar las operaciones de sacar la carta e imprimit puntaje
const tomarCarta = (puntos, puntosHTML, divCartas) => {
     // Inserción de puntos
   const carta = pedirCarta();
   puntos[0] += valorCarta( carta );
   puntosHTML.innerText = puntos[0];
   // Inserción de cartas
   const cartaNueva = document.createElement('img');
   cartaNueva.classList.add('carta');
   cartaNueva.src = './assets/cartas/' + carta + '.png';
   divCartas.append(cartaNueva); 
};

// Turno de la computadora
const turnoComputadora = (puntajeMinimo) => {
    do {
        tomarCarta(puntosComputadora, puntosHTML[1], divCartasComputadora);
    } while(puntosComputadora[0] < puntajeMinimo && puntajeMinimo <= 21); 
    console.log(puntajeMinimo);
    console.log(puntosComputadora[0]);
    determinarGanador(puntosJugador[0],puntosComputadora[0]);
};

// Turno del jugador
const tomarCartaJugador = (puntosJugador, puntosHTML, divCartas) => {
    tomarCarta(puntosJugador, puntosHTML[0], divCartas);
    if ( puntosJugador[0] > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador[0]);
   } else if ( puntosJugador[0] === 21 ) {
    console.warn('Ganaste!');
    btnPedir.disabled = true;   
   };
};






// Eventos
btnPedir.addEventListener('click',() => {
    tomarCartaJugador(puntosJugador, puntosHTML, divCartasJugador); 
});


btnNuevo.addEventListener('click', () => {
    reiniciarBarajaYPuntos();
});


btnDetener.addEventListener('click', () => {
    turnoComputadora(puntosJugador[0]);
    btnPedir.disabled = true;
    btnDetener.disabled = true;
});



/*
// TODO: Borrar
let numX = 21; // Simula una prueba, donde numX es el puntaje del jugador que sacaría
console.log(numX);
turnoComputadora(numX);
*/