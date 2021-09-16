// Name: Quyen Phan
// SpringBoard - Memory Game
// Date: 9/13/2021

const gameContainer = document.querySelector('#game');
let card1 = null;
let card2 = null;
let numberFlippedCard = 0; // to count the number of flipped card
let noClicking = false;
let countScore = 0; 

let lowestScore = localStorage.getItem("lowest-score");
let start = document.getElementById("start");

// Create an array with different colors
const COLORS = [
  "red",
  "black",
  "orange",
  "yellow",
  "blue",
  "green",
  "purple",
  "grey",
  "red",
  "black",
  "orange",
  "yellow",
  "blue",
  "green",
  "purple",
  "grey",
]


// Create Shuffle function to assign the color for each card
function shuffle(array) { //pass a given array to this function
  let counter = array.length;
  // have a while looop to loop through the array
  while (counter > 0){
    // use random to choose a random index so that it can be assigned differently
    let index = Math.floor(Math.random() * counter);

    // decrement counter so it knows when to stop
    counter --;
    // swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;

  };
  return array;

}
let assignColors = shuffle(COLORS); 


// Create division for colors
function createDivsForColors(arrayColors){
  for( let color of arrayColors){
    // create new div
    const newDiv = document.createElement('div');
    // add new class to div
    newDiv.classList.add(color);
    // add event listener for a click
    newDiv.addEventListener('click', handleCardClick);
    // push it to the original div in HTML
    gameContainer.append(newDiv)
  }
}

function handleCardClick(event){
  // use event.target to see which element was clicked
  console.log('you clicked', event.target);
  if(noClicking) return;
  if(event.target.classList.contains("flipped")) return;

  let currentCard = event.target;
  // at index 0, there is a color
  currentCard.style.backgroundColor = currentCard.classList[0];

  if(!card1 || !card2){
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  };
  if(card1 && card2) {
    noClicking = true;
    let name1 = card1.className;
    let name2 = card2.className;

    if(name1 === name2){
      // count card flip
      numberFlippedCard += 2;
      // remove event listener so that we cannot click on that card anymore
      card1.removeEventListener('click',handleCardClick);
      card2.removeEventListener('click',handleCardClick);
      // return to initial value so it can execute next pairs
      card1 = null;
      card2 = null;
      noClicking = false;
      
    } else {
      // set time for each click
      setTimeout( function(){
        
      // set cards' background to empty. it means initial value
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        // remove 'flipped', then its class left with color
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        // return to initial value so it can execute next pairs
        card1 = null;
        card2 = null;
        noClicking = false;
      
      }, 1000);
      
    }
    countScore = countScore + 1;
    yourCurrentScore(countScore);
    console.log(countScore);
  }
  countScore;
  if(numberFlippedCard === COLORS.length) endOfGame();
}

if(lowestScore){
  document.getElementById("best-score").innerText = lowestScore;
}

createDivsForColors(assignColors);
// show the increment of score while the game is played
function yourCurrentScore(newScore){
  countScore = newScore;
  document.getElementById("your-current-score").innerText = countScore;
}
// the result will be shown after you done flipping
function endOfGame(){
  let end = document.getElementById("end");
  // children of end has final-score located at index 1
  let score = end.children[1];
  score.innerText = "Your Score: " + countScore;
  // retrieve the lowest score from the local storage
  let lowestScore = +localStorage.getItem("lowest-score") || Infinity;
  // accounce to user that they reach new best score
  if (countScore < lowestScore){
    score.innerText = "New Best Score!!" 
    // save new lowest score to local storage
    localStorage.setItem("lowest-score", countScore);
  };
  // pop up 'alert'(no border box actually) by adding more class that matches .css file
  document.getElementById("end").classList.add("game-over")
}
