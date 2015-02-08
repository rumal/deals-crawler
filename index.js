//var Crawler = require("crawler");
var Deal = require('./deals.js');

var c = Deal.crawler;
var deal = Deal.Deal("title", "description", "sourceLink", "updatedTime", "validTill", ["tag1", "tag2"]);
//console.log(deal);
Deal.add(deal);
Deal.add(deal);
c.queue([{
    uri: 'https://www.hsbc.lk/1/2/hsbc.advance/special-offers',
    callback: function (error, result, $) {
         console.log(result);
    }
}]);

