'use strict';

/*
 * Work left to do:
 *
 * - Create while or do-while loop to continue displaying images for voting while votingRounds > 0
 * - Create conditional to ensure that the images for a voting round !== the images for the previous round
 *
*/

// Declares instance variables
var votingRounds = 25;
var imgLeft, imgCenter, imgRight; // Declares variables used to store arrCatalogItems indexes

// Array to create and store CatalogItem instances
var arrCatalogItems = [
  new CatalogItem('R2-D2 Suitcase', 'img/bag.jpg'),
  new CatalogItem ('Banana Cutter', 'img/banana.jpg'),
  new CatalogItem('Tablet/TP Holder', 'img/bathroom.jpg'),
  new CatalogItem('Rain Boots', 'img/boots.jpg'),
  new CatalogItem('All-in-One Breakfast Appliance', 'img/breakfast.jpg'),
  new CatalogItem('Meatball Bubblegum', 'img/bubblegum.jpg'),
  new CatalogItem('Chair', 'img/chair.jpg'),
  new CatalogItem('Cthulhu Figurine', 'img/cthulhu.jpg'),
  new CatalogItem('Duck Muzzle', 'img/dog-duck.jpg'),
  new CatalogItem('Dragon Meat', 'img/dragon.jpg'),
  new CatalogItem('Utensil Pen Caps', 'img/pen.jpg'),
  new CatalogItem('Pet Dusters', 'img/pet-sweep.jpg'),
  new CatalogItem('Pizza Scissors', 'img/scissors.jpg'),
  new CatalogItem('Shark Sleeping Bag', 'img/shark.jpg'),
  new CatalogItem('Sweeping Onesie', 'img/sweep.png'),
  new CatalogItem('TaunTaun Sleeping Bag', 'img/tauntaun.jpg'),
  new CatalogItem('Unicorn Meat', 'img/unicorn.jpg'),
  new CatalogItem('Octo-Leg USB', 'img/usb.gif'),
  new CatalogItem('Watering Can', 'img/water-can.jpg'),
  new CatalogItem('Wine Glass', 'img/wine-glass.jpg')
];

// Declares and instantiates event listeners and related event handlers
var leftCatalogImage = document.getElementById('left-catalog-image');
var centerCatalogImage = document.getElementById('center-catalog-image');
var rightCatalogImage = document.getElementById('right-catalog-image');

leftCatalogImage.addEventListener('click', handleUserVote);
centerCatalogImage.addEventListener('click', handleUserVote);
rightCatalogImage.addEventListener('click', handleUserVote);

// Declares CatalogItem constructor - takes in image name and image url
// Sets appearances and votes to zero - incrementing upon image appearing on page or user click event, respectively
function CatalogItem(name, url) {
  this.name = name;
  this.url = url;
  this.appearances = 0;
  this.votes = 0;
}

// Event handler for user click events
// Increments CatalogItem vote count and executes function to display 3 new images
// Decrements number of rounds left for user to vote on images
function handleUserVote(event) {
  event.preventDefault();

  var userSelection = event.target;
  console.log('The user clicked ' + userSelection.id);

  if (userSelection.id === 'left-catalog-image') {
    imgLeft.votes++;
  } else if (userSelection.id === 'center-catalog-image') {
    imgCenter.votes++;
  } else {
    imgRight.votes++;
  }

  votingRounds--;
  pickNewCatalogItems();
}

// Selects and displays 3 new images at random (Ignoring previous 3 images shown)
// Executes on page load and upon user click events
function pickNewCatalogItems() {
  imgLeft = arrCatalogItems[Math.floor(Math.random() * arrCatalogItems.length)];
  leftCatalogImage.src = imgLeft.url;
  imgLeft.appearances++;

  imgCenter = arrCatalogItems[Math.floor(Math.random() * arrCatalogItems.length)];
  centerCatalogImage.src = imgCenter.url;
  imgCenter.appearances++;

  imgRight = arrCatalogItems[Math.floor(Math.random() * arrCatalogItems.length)];
  rightCatalogImage.src = imgRight.url;
  imgRight.appearances++;
}

pickNewCatalogItems();