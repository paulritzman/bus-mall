'use strict';

// Total number of rounds to vote - increments upon user clicks
var votingRounds = 1;

// Variables used to store CatalogItem.allItems indexes
var imgLeft;
var imgCenter;
var imgRight;

// Accesses img elements from DOM
var leftCatalogImage = document.getElementById('left-catalog-image');
var centerCatalogImage = document.getElementById('center-catalog-image');
var rightCatalogImage = document.getElementById('right-catalog-image');

// Accesses button elements from DOM
var btnBar = document.getElementById('bar');
var btnPie = document.getElementById('pie');

// Declares arrays used to store instances of CatalogItem objects, as well as store previous voting round images
CatalogItem.previousCatalogItems = [];

var parsedCatalog = JSON.parse(localStorage.getItem('results'));

// Declares CatalogItem constructor - takes in image name, image url, and image alt text
// Sets appearances and votes to zero - incrementing upon image appearing on page or user click event, respectively
function CatalogItem(name, src, alt) {
  this.name = name;
  this.src = src;
  this.alt = alt;
  this.appearances = 0;
  this.votes = 0;
}

// Creates instances of CatalogItem
CatalogItem.allItems = parsedCatalog || [
  new CatalogItem('R2-D2 Suitcase', 'img/bag.jpg', 'R2-D2 designed rolling suit case'),
  new CatalogItem('Banana Cutter', 'img/banana.jpg', 'Plastic banana slicer'),
  new CatalogItem('Tablet/TP Holder', 'img/bathroom.jpg', 'Dual table and toilet paper holder'),
  new CatalogItem('Rain Boots', 'img/boots.jpg', 'Rain boots with shoe top cut-out'),
  new CatalogItem('All-in-One Breakfast Appliance', 'img/breakfast.jpg', 'Multi-use appliance for cooking'),
  new CatalogItem('Meatball Bubblegum', 'img/bubblegum.jpg', 'Bubblegum shaped like meatballs'),
  new CatalogItem('Chair', 'img/chair.jpg', 'Chair with dome shaped seat'),
  new CatalogItem('Cthulhu Figurine', 'img/cthulhu.jpg', 'Cthulhu figuring with accompanying toy soldier'),
  new CatalogItem('Duck Muzzle', 'img/dog-duck.jpg', 'Duck-bill shaped dog muzzle'),
  new CatalogItem('Dragon Meat', 'img/dragon.jpg', 'Canned dragon meat'),
  new CatalogItem('Utensil Pen Caps', 'img/pen.jpg', 'Pen caps shaped like eating utensils'),
  new CatalogItem('Pet Dusters', 'img/pet-sweep.jpg', 'Duster booties for dogs'),
  new CatalogItem('Pizza Scissors', 'img/scissors.jpg', 'Dual scissors and spatula for pizza'),
  new CatalogItem('Shark Sleeping Bag', 'img/shark.jpg', 'Shark shaped sleeping bag'),
  new CatalogItem('Sweeping Onesie', 'img/sweep.png', 'Baby onesie with duster on front'),
  new CatalogItem('TaunTaun Sleeping Bag', 'img/tauntaun.jpg', 'TaunTaun design sleeping bag'),
  new CatalogItem('Unicorn Meat', 'img/unicorn.jpg', 'Canned unicorn meat'),
  new CatalogItem('Octo-Leg USB', 'img/usb.gif', 'Moving octopus tentacle USB dongle'),
  new CatalogItem('Watering Can', 'img/water-can.jpg', 'Curved watering can'),
  new CatalogItem('Wine Glass', 'img/wine-glass.jpg', 'Wine glass')
];

// Function to sort the instances of CatalogItem by vote number
CatalogItem.sortVotes = function() {
  CatalogItem.allItems.sort(function(a, b){return b.votes - a.votes;});
};

// Renders chart to the DOM - displaying voting results
CatalogItem.renderChart = function(chartType, boolLabel) {
  // Instantiates arrays for use in myChart object
  var arrChartLabel = [];
  var arrChartData = [];
  var arrChartColor = [];
  for (var i in CatalogItem.allItems) {
    arrChartLabel.push(CatalogItem.allItems[i].name);
    arrChartData.push(CatalogItem.allItems[i].votes);
    arrChartColor.push('#' + Math.floor(Math.random() * 16777215).toString(16));
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: arrChartLabel,
      datasets: [{
        label: 'Voting Results',
        data: arrChartData,
        backgroundColor: arrChartColor,
        borderColor: arrChartColor,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          scaleLabel: {
            display: boolLabel,
            labelString: 'Catalog Items'
          },
          ticks: {
            autoSkip: false,
            stepSize: 1
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: boolLabel,
            labelString: 'Votes'
          },
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
};

// Generates 3 random indexes to use for selecting new CatalogItem instances to display
CatalogItem.randomIndexes = function() {
  var arrIndexes = [];

  while (arrIndexes.length < 3) {

    var randomNum = Math.floor(Math.random() * CatalogItem.allItems.length);

    if (!CatalogItem.previousCatalogItems.includes(randomNum) && !arrIndexes.includes(randomNum)) {
      arrIndexes.push(randomNum);
    } else {
      console.log('Duplicate image caught.');
    }
  }

  CatalogItem.previousCatalogItems = arrIndexes;
  return arrIndexes;
};

// Selects and displays 3 new images at random (Ignoring previous 3 images shown)
// Executes on page load and upon user click events
CatalogItem.pickNewCatalogItems = function() {

  var newIndexes = CatalogItem.randomIndexes();

  imgLeft = CatalogItem.allItems[newIndexes[0]];
  leftCatalogImage.src = imgLeft.src;
  leftCatalogImage.alt = imgLeft.alt;

  imgCenter = CatalogItem.allItems[newIndexes[1]];
  centerCatalogImage.src = imgCenter.src;
  centerCatalogImage.alt = imgCenter.alt;

  imgRight = CatalogItem.allItems[newIndexes[2]];
  rightCatalogImage.src = imgRight.src;
  rightCatalogImage.alt = imgRight.alt;

  imgLeft.appearances++;
  imgCenter.appearances++;
  imgRight.appearances++;
};

// Event handler for user click events
// Increments vote count and executes function to display 3 new images and number of rounds left
CatalogItem.handleUserVote = function(event) {
  console.log('Round = ' + votingRounds);
  votingRounds++;

  var userSelection = event.target;
  console.log('The user clicked ' + userSelection.id);

  if (userSelection.id === 'left-catalog-image') {
    imgLeft.votes++;
  } else if (userSelection.id === 'center-catalog-image') {
    imgCenter.votes++;
  } else {
    imgRight.votes++;
  }

  // Stop listening for click events and render results to the DOM after the 25th round
  if (votingRounds > 25) {
    leftCatalogImage.removeEventListener('click', CatalogItem.handleUserVote);
    centerCatalogImage.removeEventListener('click', CatalogItem.handleUserVote);
    rightCatalogImage.removeEventListener('click', CatalogItem.handleUserVote);

    // Sorts CatalogItem instances by votes
    CatalogItem.sortVotes();

    // Stores results on local machine
    localStorage.setItem('results', JSON.stringify(CatalogItem.allItems));

    // Renders chart to the DOM
    //CatalogItem.renderChart();
  }

  CatalogItem.pickNewCatalogItems();
};

function handleResultButton(event) {
  var chartType = event.target.id;
  console.log(chartType);

  // Determines if chart label should appear
  var boolLabel = true;
  if (chartType === 'pie')
    boolLabel = false;

  CatalogItem.renderChart(chartType, boolLabel);
}

// Event listeners for accepting user click input
leftCatalogImage.addEventListener('click', CatalogItem.handleUserVote);
centerCatalogImage.addEventListener('click', CatalogItem.handleUserVote);
rightCatalogImage.addEventListener('click', CatalogItem.handleUserVote);

btnBar.addEventListener('click', handleResultButton);
btnPie.addEventListener('click', handleResultButton);

// Executes on page load
CatalogItem.pickNewCatalogItems();