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

// Variables and constants initialization
const min_number = 1;
const max_number = 100;
const numbers_quantity = 5;
var random_numbers_array = [];
const seconds_countdown = 10;
var remove_timer = seconds_countdown * 1000;
var input_timer = remove_timer + 1000;
var user_numbers_array = [];
var guessed_numbers_array = [];
var countdown_stop;

$(document).ready(function() {
  // Generating random numbers
  do {
    var random_number = getRndInteger(min_number, max_number);
    console.log('The random number generated is: ' + random_number + '.');
    // Check if the new number is a duplicate
    if (!random_numbers_array.includes(random_number)) {
      // Storing the new number in the array (if it is NOT a duplicate)
      random_numbers_array.push(random_number);
    }
  } while (random_numbers_array.length < numbers_quantity);
  console.log('The array containing the random numbers is: ' , random_numbers_array);

  // ------------------------- DOM MANIPULATION -------------------------

  // Showing random numbers in the web page (HTML)
  $('#random-numbers').append('<h2>Random Numbers</h2>');
  $('#random-numbers').append('<p>You have ' + seconds_countdown + ' seconds to memorize the following numbers:</p>');
  for (var i = 0; i < random_numbers_array.length; i++) {
    $('#random-numbers').append('<span>' + random_numbers_array[i] + '</span>');
  }
  // Starting the countdown (to remove numbers from HTML)
  setTimeout(removeNumbers, remove_timer);
  // Showing the countdown on the screen
  countdown_stop = setInterval(countdown, 1000);
  $('#countdown-section').prepend('<p>Remaining time:</p>');
  $('#countdown-section').prepend('<h2>Countdown</h2>');
  // Entering inputs from the user after the previous countdown has ended
  setTimeout(guessingNumbers, input_timer);
});


// --------------------------- FUNCTIONS ---------------------------

// Generating random number
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

// Countdown of numbers on the screen
var k = 1;
function countdown() {
  var seconds_visualized = seconds_countdown - k;
  $('#countdown-section > span').text(seconds_visualized);
  k++;
  // Stopping countdown on the screen
  if(k === seconds_countdown+1) {
    clearInterval(countdown_stop);
    $('#countdown-section > h2').remove();
    $('#countdown-section > p').remove();
    $('#countdown-section > span').remove();
  }
}

// Removing numbers
function removeNumbers() {
  // Removing numbers
  $('#random-numbers > h2').remove();
  $('#random-numbers > p').remove();
  $('#random-numbers > span').remove();
};

// User's guesses about the numbers he/she can recollect & results/output
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

  // ***** Messages to the user & console & output in the DOM *****

  // Ouput in the DOM - "Results" section header
  $('#results-section').append('<h2>Results</h2>');
  // Results
  if (guessed_numbers_array.length) {
    if (guessed_numbers_array.length === numbers_quantity) {
    // Message about recollecting ALL of the numbers
    console.log('The user could recollect all of the ' + numbers_quantity + '  numbers!');
    alert('CONGRATULATIONS! You could recollect all of the ' + numbers_quantity + ' numbers!');
    // Ouput in the DOM
    $('#results-section').append('<h3>CONGRATULATIONS!</h3>');
    $('#results-section').append('<p>You could recollect all of the ' + numbers_quantity + ' numbers!</p>');
    } else {
    // Message about HOW MANY numbers he/she could recollect
    console.log('The user recollected ' + guessed_numbers_array.length + ' number(s).');
    alert('You recollected ' + guessed_numbers_array.length + ' number(s).');
    // Ouput in the DOM
    $('#results-section').append('<p>You recollected ' + guessed_numbers_array.length + ' number(s).</p>');
    }
    // Message about WHICH numbers he/she recollected
    console.log('The array containing all of the guessed numbers is: ' , guessed_numbers_array);
    alert('Number(s) recollected: ' + guessed_numbers_array.join(' - ') + '.');// Ouput in the DOM
    $('#results-section').append('<h3>Number(s) recollected:</h3>');
    $('#results-section').append('<span>' + guessed_numbers_array.join(' - ') + '</span>');
  } else {
    // Message about NOT recollecting any number
    console.log('The user couldn\'t recollect any number.');
    alert('You couldn\'t recollect any number. We strongly recommend you go to the doctor and check your memory!');
    // Ouput in the DOM
    $('#results-section').append('<p>You couldn\'t recollect any number.</p>');
    $('#results-section').append('<p>We strongly recommend you go to the doctor and check your memory!</p>');
  }
  $('#results-section').append('<h3>The shown numbers were:</h3>');
  $('#results-section').append('<span>' + random_numbers_array.join(' - ') + '</span>');
}
