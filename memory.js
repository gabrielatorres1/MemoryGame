const gameContainer = document.getElementById("game");
 let card1 = null;
 let card2 = null;
 let cardsFlipped = 0;
 let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  // if nothing has beeen clicked return false 
  if (noClicking) return;
  if (event.target.classList.contains(`flipped`)) return;
  // The value of current card is the HTML element that triggered the click event in this case its the card clicked.
  let currentCard = event.target;
  // This line sets the background color the current card is the one that has been triggered on the HTML file and the current cardCard.class list[0] retrived the first class from the array which we can assume to represent the color of the array.
  currentCard.style.backgroundColor = currentCard.classList[0];
// This condition checks if card 1 or card 2 are undefined or null
  if (!card1 || !card2){
    currentCard.classList.add(`flipped`);
    //if its the first or second card being clicked, the class flipped is added to current card this indicates that the card has been turned over
    card1 = card1 || currentCard;
    // card 1 is assigned to thr value of current card it remains unchaged 
    card2 = currentCard === card1 ? null : currentCard;
    // if current card is the same as card 1 it means the player clicked on the same card . If current current card is diffrent card than card1 and card2 is assigned the value of current card.
 }
//  This logic checks if both cards have been signed a value meaning the player has picked two diffrent cards 
if (card1 && card2){
  // the no clicking variable changed to true after the player picked two cards. Once the the match are evaluated the noClick changed back to false 
  noClicking = true;
  // This line extracts the class name and turning t into a string making it easier to compare
  let gif1 = card1.className;
  let gif2 = card2.className;

  if (gif1 === gif2){
    cardsFlipped += 2;
    // the event removeListener is placed to prevent the user from clicking the same cards again.
    card1.removeEventListener(`click`, handleCardClick);
    card2.removeEventListener(`click`, handleCardClick);
    // cards are reset to null indicating no cards have been selected 
    card1 = null;
    card2 = null;
    // noClicking has been placed back to false to allow the user to pick two cards
    noClicking = false;
  }else {
    setTimeout(function(){
      // empty strung to  hide the color.
      card1.style.backgroundColor = ``;
      card2.style.backgroundColor = ``;
      // flip the cards back
      card1.classList.remove(`flipped`);
      card2.classList.remove(`flipped`);
      // resert the cards back to null
      card1 = null;
      card2 = null;
      // to allow the player to click cards again
      noClicking = false;
    }, 1000)
  }
}
// This condition check if the total number of flipped card pairs to cards flippedis equal to the tottal numbers of cards in the game 
if (cardsFlipped === COLORS.length) alert(`game over!`);
}

// when the DOM loads
createDivsForColors(shuffledColors);
