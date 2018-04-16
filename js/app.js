'use strict';

// Declares instance variables
var votingRounds = 25;
var imgLeft, imgCenter, imgRight; // Declares variables used to store arrCatalogItems indexes
var arrCatalogItems = [ // Array to create and store CatalogItem instances
  new CatalogItem('testImg1', 'img/bag.jpg'),
  new CatalogItem ('testImg2', 'img/banana.jpg'),
  new CatalogItem('testImg3', 'img/bathroom.jpg')
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