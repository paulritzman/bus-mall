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
CatalogItem.imgLeft;
CatalogItem.imgCenter;
CatalogItem.imgRight; // Declares variables used to store arrCatalogItems indexes
CatalogItem.previousCatalogItems = []; // Declares array to store images from previous voting round

// Declares and instantiates event listeners and related event handlers
CatalogItem.leftCatalogImage = document.getElementById('left-catalog-image');
CatalogItem.centerCatalogImage = document.getElementById('center-catalog-image');
CatalogItem.rightCatalogImage = document.getElementById('right-catalog-image');

CatalogItem.allItems = [];

// Declares CatalogItem constructor - takes in image name, image url, and image alt text
// Sets appearances and votes to zero - incrementing upon image appearing on page or user click event, respectively
function CatalogItem(name, src, alt) {
  this.name = name;
  this.src = src;
  this.alt = alt;
  this.appearances = 0;
  this.votes = 0;
  CatalogItem.allItems.push(this);
}

new CatalogItem('R2-D2 Suitcase', 'img/bag.jpg', 'R2-D2 designed rolling suit case');
new CatalogItem('Banana Cutter', 'img/banana.jpg', 'Plastic banana slicer');
new CatalogItem('Tablet/TP Holder', 'img/bathroom.jpg', 'Dual table and toilet paper holder');
new CatalogItem('Rain Boots', 'img/boots.jpg', 'Rain boots with shoe top cut-out');
new CatalogItem('All-in-One Breakfast Appliance', 'img/breakfast.jpg', 'Multi-use appliance for cooking');
new CatalogItem('Meatball Bubblegum', 'img/bubblegum.jpg', 'Bubblegum shaped like meatballs');
new CatalogItem('Chair', 'img/chair.jpg', 'Chair with dome shaped seat');
new CatalogItem('Cthulhu Figurine', 'img/cthulhu.jpg', 'Cthulhu figuring with accompanying toy soldier');
new CatalogItem('Duck Muzzle', 'img/dog-duck.jpg', 'Duck-bill shaped dog muzzle');
new CatalogItem('Dragon Meat', 'img/dragon.jpg', 'Canned dragon meat');
new CatalogItem('Utensil Pen Caps', 'img/pen.jpg', 'Pen caps shaped like eating utensils');
new CatalogItem('Pet Dusters', 'img/pet-sweep.jpg', 'Duster booties for dogs');
new CatalogItem('Pizza Scissors', 'img/scissors.jpg', 'Dual scissors and spatula for pizza');
new CatalogItem('Shark Sleeping Bag', 'img/shark.jpg', 'Shark shaped sleeping bag');
new CatalogItem('Sweeping Onesie', 'img/sweep.png', 'Baby onesie with duster on front');
new CatalogItem('TaunTaun Sleeping Bag', 'img/tauntaun.jpg', 'TaunTaun design sleeping bag');
new CatalogItem('Unicorn Meat', 'img/unicorn.jpg', 'Canned unicorn meat');
new CatalogItem('Octo-Leg USB', 'img/usb.gif', 'Moving octopus tentacle USB dongle');
new CatalogItem('Watering Can', 'img/water-can.jpg', 'Curved watering can');
new CatalogItem('Wine Glass', 'img/wine-glass.jpg', 'Wine glass');

// Event handler for user click events
// Increments CatalogItem vote count and executes function to display 3 new images
// Decrements number of rounds left for user to vote on images
CatalogItem.handleUserVote = function(event) {
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
};

// Selects and displays 3 new images at random (Ignoring previous 3 images shown)
// Executes on page load and upon user click events
function pickNewCatalogItems() {

  previousCatalogItems.push(imgLeft, imgRight, imgCenter);

  do {
    imgLeft = arrCatalogItems[Math.floor(Math.random() * arrCatalogItems.length)];
    leftCatalogImage.src = imgLeft.url;
    leftCatalogImage.altText = imgLeft.altText;

    imgCenter = arrCatalogItems[Math.floor(Math.random() * arrCatalogItems.length)];
    centerCatalogImage.src = imgCenter.url;
    centerCatalogImage.altText = imgCenter.altText;

    imgRight = arrCatalogItems[Math.floor(Math.random() * arrCatalogItems.length)];
    rightCatalogImage.src = imgRight.url;
    rightCatalogImage.altText = imgRight.altText;
  } while (previousCatalogItems.includes());

  imgLeft.appearances++;
  imgCenter.appearances++;
  imgRight.appearances++;

  previousCatalogItems = [];
}

CatalogItem.leftCatalogImage.addEventListener('click', CatalogItem.handleUserVote);
CatalogItem.centerCatalogImage.addEventListener('click', CatalogItem.handleUserVote);
CatalogItem.rightCatalogImage.addEventListener('click', CatalogItem.handleUserVote);

pickNewCatalogItems();