/* ASSIGNMENT
Visualizzare in pagina 5 numeri casuali.
Da lì parte un timer di 30 secondi. --> 30.000 millisecondi
Dopo 30 secondi, vengono rimossi i numeri dalla pagina
e l'utente deve inserire (tramite prompt) i numeri che ha visto precedentemente, uno alla volta.
Dopo che sono stati inseriti i 5 numeri,
il software dice quanti e quali dei numeri da indovinare sono stati individuati.
BONUS: visualizzare in pagina anche un timer con il countdown dei 30 secondi
*/

// Varaibles and constants initialization
const min_number = 1;
const max_number = 100;
const numbers_quantity = 5;
var numbers_array = [];
const timer = 30000;
var i = 0;

$(document).ready(function() {
  // Generating random numbers
  do {
    var random_number = getRndInteger(min_number, max_number);
    console.log(random_number);
    // Check if the new number is a duplicate
    if (!numbers_array.includes(random_number)) {
      // Storing the new number in the array (if it is NOT a duplicate)
      numbers_array.push(random_number);
      i++
    }
  } while (i < numbers_quantity);
  console.log(numbers_array);

  // ------------------------- DOM MANIPULATION -------------------------

  // Printing random numbers in the web page (HTML)
  for ( i = 0; i < numbers_array.length; i++) {
    $('#random-numbers').append('<span>' + numbers_array[i] + '</span>');
  }
  // Starting the countdown to remove numbers from HTML
  setTimeout(removeNumbers, timer);

});


// --------------------------- FUNCTIONS ---------------------------

// Generating random number
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

// Removing numbers from HTML
function removeNumbers() {
  $('span').remove();
};
