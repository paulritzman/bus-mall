'use strict';

var votingRounds = 25;

var arrCatalogItems = [new CatalogItem('testImg1', 'img/bag.jpg'), new CatalogItem ('testImg2', 'img/banana.jpg'), new CatalogItem('testImg3', 'img/bathroom.jpg')];

function CatalogItem(name, url) {
  this.name = name;
  this.url = url;
  this.appearances = 0;
  this.votes = 0;
}

var leftCatalogImage = document.getElementById('left-catalog-image');
var centerCatalogImage = document.getElementById('center-catalog-image');
var rightCatalogImage = document.getElementById('right-catalog-image');

leftCatalogImage.addEventListener('click', handleUserVote);
centerCatalogImage.addEventListener('click', handleUserVote);
rightCatalogImage.addEventListener('click', handleUserVote);

function handleUserVote(event) {
  event.preventDefault();

  var userSelection = event.target;
  console.log('The user clicked ' + userSelection.id);
}

function pickNewCatalogItems() {
  var imgLeft = arrCatalogItems[Math.floor(Math.random() * arrCatalogItems.length)];
  leftCatalogImage.src = imgLeft.url;
  imgLeft.appearances++;

  var imgCenter = arrCatalogItems[Math.floor(Math.random() * arrCatalogItems.length)];
  centerCatalogImage.src = imgCenter.url;
  imgCenter.appearances++;

  var imgRight = arrCatalogItems[Math.floor(Math.random() * arrCatalogItems.length)];
  rightCatalogImage.src = imgRight.url;
  imgRight.appearances++;
}

pickNewCatalogItems();