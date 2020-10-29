/* ASSIGNMENT
Visualizzare in pagina 5 numeri casuali.
Da lì parte un timer di 30 secondi. --> 30.000 millisecondi
Dopo 30 secondi, vengono rimossi i numeri dalla pagina
e l'utente deve inserire (tramite prompt) i numeri che ha visto precedentemente, uno alla volta.
Dopo che sono stati inseriti i 5 numeri,
il software dice quanti
e quali dei numeri da indovinare sono stati individuati.
BONUS: visualizzare in pagina anche un timer con il countdown dei 30 secondi
*/

// Varaibles and constants initialization
const min_number = 1;
const max_number = 100;
const numbers_quantity = 5;
var random_numbers_array = [];
const remove_timer = 30000;
const input_timer = 31000;
var user_numbers_array = [];
var guessed_numbers_array = [];
var i = 0;

$(document).ready(function() {
  // Generating random numbers
  do {
    var random_number = getRndInteger(min_number, max_number);
    console.log('The random number generated is: ' + random_number + '.');
    // Check if the new number is a duplicate
    if (!random_numbers_array.includes(random_number)) {
      // Storing the new number in the array (if it is NOT a duplicate)
      random_numbers_array.push(random_number);
      i++
    }
  } while (i < numbers_quantity);
  console.log('The array containing the random numbers is: ' , random_numbers_array);

  // ------------------------- DOM MANIPULATION -------------------------

  // Printing random numbers in the web page (HTML)
  for ( i = 0; i < random_numbers_array.length; i++) {
    $('#random-numbers').append('<span>' + random_numbers_array[i] + '</span>');
  }
  // Starting the countdown to remove numbers from HTML
  setTimeout(removeNumbers, remove_timer);
  // Entering inputs from the user after the previous countdown has ended
  setTimeout(guessingNumbers, input_timer);
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


function guessingNumbers() {
  // ***** Entering inputs from the user (the numbers he/she can remember) *****
  do {
    // Entering inputs
    var user_number = parseInt(prompt('Enter a number that you can recall from those on the screen.'));
    // Check if the input entered is a number
    if (!isNaN(user_number)) {
      // Check if the input entered has already been entered
      if (!user_numbers_array.includes(user_number)) {
        // Adding the new number in the user's numbers array
        user_numbers_array.push(user_number);
      } else {
        // The number is a duplicate
        alert('ERROR. You have already entered this number. Please try with another one!');
      }
    } else {
      // The input is not a number
      alert('ERROR. The value you entered is not valid. Please enter a number.');
    }
  } while (user_numbers_array.length < numbers_quantity);
  console.log('The array containing the user\'s numbers is: ' , user_numbers_array);

  // ***** Check which numbers got recollected by the user *****
  for (var j = 0; j < user_numbers_array.length; j++) {
    var isGuessed = random_numbers_array.includes(user_numbers_array[j]);
    if(isGuessed) {
      // Add the guessed numbers in an array
      guessed_numbers_array.push(user_numbers_array[j]);
    }
  }

  // ***** Messages to the user & console *****
  if (guessed_numbers_array.length) {
    if (guessed_numbers_array.length === numbers_quantity) {
    // Message about recollecting ALL of the numbers
    console.log('The user could recollect all of the ' + numbers_quantity + '  numbers!');
    alert('CONGRATULATIONS! You could recollect all of the ' + numbers_quantity + ' numbers!');
    } else {
    // Message about HOW MANY numbers he/she could recollect
    console.log('The user recollected ' + guessed_numbers_array.length + ' numbers.');
    alert('You recollected ' + guessed_numbers_array.length + ' numbers.');
    }
    // Message about WHICH numbers he/she recollected
    console.log('The array containing all the guessed numbers is: ' , guessed_numbers_array);
    alert('They are: ' + guessed_numbers_array);
  } else {
    // Message about NOT recollecting any number
    console.log('The user couldn\'t recollect any number.');
    alert('You couldn\'t recollect any number. We strongly recommend you go to the doctor and check your memory!');
  }
}
