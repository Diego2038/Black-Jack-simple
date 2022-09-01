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
 };
 
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
 
 // Lado del jugador
 let cantidadPuntajeJugador = [0];
 const puntajeJugador = document.querySelector('#puntaje-jugador'); // El número del puntaje en la pantalla
 const jugadorCartas = document.querySelector('#jugador-cartas'); // Es el div donde están las cartas
 const partidasGanadasJugador = document.querySelector('#partidas_ganadas_jugador'); // El número de partidas ganadas en la pantalla
 
 // Lado de la computadora
 let cantidadPuntajeComputadora = [0];
 const puntajeComputadora = document.querySelector('#puntaje-computadora');
 const computadoraCartas = document.querySelector('#computadora-cartas');
 const partidasGanadasComputadora = document.querySelector('#partidas_ganadas_computadora');
 
 
 // Función que se encarga de reiniciar los aspectos elementales de la partida (la ronda, más no el juego en general)
 const reiniciarBarajaYPuntos = () => {
     console.log('Partida reiniciada');
     deck = [];
     deck = crearDeck();
     jugadorCartas.innerHTML = '';
     computadoraCartas.innerHTML = '';
     cantidadPuntajeJugador[0] = 0;
     cantidadPuntajeComputadora[0] = 0;
     puntajeJugador.innerText = '0';
     puntajeComputadora.innerText = '0';
 };
 
 // Función que se encarga de extraer una carta del maso (deck)
 const sacarCarta = (puntaje, puntajeHTML, divCartas) => {
     if ( btnPedir.textContent === 'Siguiente ronda') {
         btnPedir.innerText = 'Pedir carta';
         reiniciarBarajaYPuntos();
         btnDetener.disabled = false;
     };
     let cartaxd = pedirCarta();
     puntaje[0] += valorCarta(cartaxd);
     puntajeHTML.innerHTML = puntaje[0];
     let cartaImagen = document.createElement('img');
     cartaImagen.classList.add('carta');
     cartaImagen.src = './assets/cartas/' + cartaxd + '.png'; // La dirección se está dando desde la ubicación del index.html
     // console.log('>>> ' + cartaImagen.src); 
     divCartas.append(cartaImagen);
     // console.log(cartaxd);
     // console.log(`El puntaje actual es ${cantidadPuntajeJugador}`);
 };
 
 // función que se encarga de hacer el turno de la computadora
 const sacarCartaComputadora = () => {
     do {
         sacarCarta(cantidadPuntajeComputadora,puntajeComputadora,computadoraCartas);
     }while(cantidadPuntajeComputadora[0] < cantidadPuntajeJugador[0] && cantidadPuntajeJugador[0] <= 21);
 };
 
 
 
 // Función que se encarga de modificar los datos pertinentes dependiendo del ganador
 const modificarAlGanador = (ganador) => {
     //reiniciarBarajaYPuntos();
     (ganador === 'jugador') ? 
     partidasGanadasJugador.innerText = (partidasGanadasJugador.textContent * 1) + 1
     : partidasGanadasComputadora.innerText = (partidasGanadasComputadora.textContent * 1) + 1;
 };
 
 // Función que se encarga de definir quién ganó
 const definirGanador = () => {
     ( cantidadPuntajeJugador[0] > 21 ) ? 
     modificarAlGanador('computadora')
     : ( cantidadPuntajeComputadora[0] > 21 ) ?
     modificarAlGanador('jugador')
     : ( cantidadPuntajeJugador[0] === cantidadPuntajeComputadora[0] ) ?
     console.log('Empate')
     : ( cantidadPuntajeJugador[0] > cantidadPuntajeComputadora[0] ) ?
     modificarAlGanador('jugador')
     : modificarAlGanador('computadora');
     btnPedir.innerText = 'Siguiente ronda';
 };
 
 
 // Eventos
 btnPedir.addEventListener('click',() => {
  sacarCarta(cantidadPuntajeJugador,puntajeJugador,jugadorCartas);
  if ( cantidadPuntajeJugador[0] > 21) {
      btnDetener.click();
      btnDetener.disabled = true;
  } else if ( cantidadPuntajeJugador[0] === 21) {
    btnPedir.disabled = true;
  };
});
 
 
 btnNuevo.addEventListener('click', () => {
     reiniciarBarajaYPuntos();
     partidasGanadasJugador.innerText = '0';
     partidasGanadasComputadora.innerText = '0';
});
 
 
 btnDetener.addEventListener('click', () => {
     sacarCartaComputadora();
     definirGanador();
     if (btnPedir.disabled === true) btnPedir.disabled = false;
});