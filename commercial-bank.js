var BASE_DOMAIN = "http://www.combank.net";


var Deals = require('./deals.js')(BASE_DOMAIN, ['commercial-bank']),
    _ = require('underscore.string');


/**
 * Handle individual deal pages
 * @param error
 * @param result
 * @param $
 */
var offerDetailPageCB = function (error, result, $) {
    if (error) throw error;

    var title = $("h1").text();
    var description = $(".offer-details").text();
    var sourceLink = result.uri;
    var updatedTime = +new Date();
    var tags = [];
    var validity = "";
    var partner = "";
    var imgSelector = ".offer-details img";

    var deal = Deals.Deal(title, description , partner, sourceLink, updatedTime, validity, tags);
    if ($(imgSelector).attr('src'))
        deal.image = $(imgSelector).attr('src');

    Deals.add(deal);
};

var subOfferDetailPageCB = function (error, result, $) {
    if (error) throw error;


    $("#location-tabs div").each(function(i, e){
        var title = "";
        var description = "";
        var sourceLink = result.uri;
        var updatedTime = +new Date();
        var tags = [];
        var validity = "";
        var partner = "";
        var imgSelector = "img";

        var deal = Deals.Deal(title, description , partner, sourceLink, updatedTime, validity, tags);
        if ($(imgSelector).attr('src'))
            deal.image = $(imgSelector, e).attr('src');

        Deals.add(deal);
    });

};

/**
 * Handles the main deal list pages
**/
Deals.queue('/newweb/personal/cards/offers?mode=card', function (error, result, $) {
    if (error) throw error;
    $("#product-1 .offer-item a.product-link").each(function(index, a){
        var dealURL = $(a).attr('href');
        Deals.queue(dealURL, offerDetailPageCB);
    });
});

Deals.queue('/newweb/personal/cards/offers?cat=Automobile', function (error, result, $) {
    if (error) throw error;

    //Add relative sub offer pages
    $("#product-menu a").each(function(index, a){
        var dealURL = $(a).attr('href');
        Deals.queue(dealURL, subOfferDetailPageCB);
    });

    //Add the current page offers
    subOfferDetailPageCB(error, result, $);
});