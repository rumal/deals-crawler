var BASE_DOMAIN = "http://www.americanexpress.lk/";


var Deals = require('./deals.js')(BASE_DOMAIN, ['credit-card', 'american-express']),
    _ = require('underscore.string');


/**
 * Handle individual deal pages
 * @param error
 * @param result
 * @param $
 */
var offerDetailPageCB = function (error, result, $) {
    if (error) throw error;

    var title = $("h3[title='THE WARDROBE']").text();
    var description = $(".termsconds").text();
    var sourceLink = result.uri;
    var updatedTime = +new Date();
    var tags = [];
    var validity = "";
    var partner = "";
    var imgSelector = "p img";

    var deal = Deals.Deal(title, description , partner, sourceLink, updatedTime, validity, tags);
    if ($(imgSelector).attr('src'))
        deal.image = $(imgSelector).attr('src');

    Deals.add(deal);

};

//Deals.queue('/personal/cards/offers/fuel_promo.html', offerDetailPageCB);
//Deals.queue('/personal/cards/offers/fuel_promo.html', offerDetailPageCB);
Deals.queue('/personal/cards/offers/default.htm', function (error, result, $) {
    if (error) throw error;

    //Add relative sub offer pages
    $("td[align=right] a").each(function(index, a){
        var dealURL = $(a).attr('href');
        if (_.startsWith(dealURL, "/") || _.startsWith(dealURL, ".") || _.startsWith(dealURL, "http") || !_.endsWith(dealURL, "html")) return;
        Deals.queue(dealURL, offerDetailPageCB);
    });
});