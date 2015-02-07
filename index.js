var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        console.log("Default");

    }
});


c.queue([{
    uri: 'https://www.hsbc.lk/1/2/hsbc.advance/special-offers',
    callback: function (error, result, $) {
         $('a').each(function(index, a) {
//            var toQueueUrl = $(a).attr('href');
            console.log($(a).text());
        });
    }
}]);

