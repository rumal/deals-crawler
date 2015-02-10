var BASE_DOMAIN = "https://mydeal.lk/";


var Deals = require('./deals.js')(BASE_DOMAIN, ['mydeals.lk']),
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

var offerDetailPageCB = function (error, result, $) {
    if (error) throw error;

    var title = $(".title h1").text();
    var description = $(".deal-info").text();
    var sourceLink = result.uri;
    var updatedTime = +new Date();
    var tags = [];
    var validity = new Date(+new Date() + ($(".jcurrentTimeLeft").val() - 1000));
    var partner = "";
    var imgSelector = ".deal-image img";

    var deal = Deals.Deal(title, description , partner, sourceLink, updatedTime, validity, tags);
    deal.originalPrice = $(".original strong").text();
    deal.salePrice = $(".price p").text();
    deal.discount = $(".dc strong").text();
    if ($(imgSelector).attr('src'))
        deal.image = $(imgSelector).attr('src');

    Deals.add(deal);

};

Deals.queue('/', function (error, result, $) {
    if (error) throw error;

    //Add relative sub offer pages
    $(".deal.round h1 a").each(function(index, a){
        var dealURL = $(a).attr('href');
        Deals.queue(dealURL, offerDetailPageCB);
    });
});