'use strict';

var votingRounds = 25;

var arrCatalogItems = [];

function CatalogItem(name, url) {
  this.name = name;
  this.url = url;
  this.appearances = 0;
  this.votes = 0;
}