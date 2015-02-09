var BASE_DOMAIN = "http://www.sampath.lk/";


var Deals = require('./deals.js')(BASE_DOMAIN, ['sampath-bank']),
    _ = require('underscore.string');


/**
 * Handle individual deal pages
 * @param error
 * @param result
 * @param $
 */
var dealPageCB = function (error, result, $) {
    if (error) throw error;

    var title = $(".responsive-offer h1 + p").text();
    var description = $(".responsive-offer h2 + ol").text();
    var partner = _.strRight($(".responsive-offer h1 + p + p").text(), "Partner: ");
    var validity = _.strRight($(".responsive-offer h1 + p + p + p").text(), "Promotion Period: ");

    var tags = [];
    var eligibleCards = _.strRight($(".responsive-offer h1 + p + p + p + p").text(),"Eligible Card Categories: ");
    if (_.include(eligibleCards, "MasterCard")){
        tags.push("master-cards");
    }
    if (_.include(eligibleCards, "Visa")){
        tags.push("visa-cards");
    }

    tags.push(_.strLeft(partner, " (Pvt) Ltd"))


    var sourceLink = result.uri;
    var updatedTime = +new Date();
    var imageSelector = ".responsive-offer img";

    var deal = Deals.Deal(title, description , partner, sourceLink, updatedTime, validity, tags);
    if ($(imageSelector).attr('src'))
        deal.image = $(imageSelector).attr('src');

    Deals.add(deal);
};

/**
 * Handles the main deal list pages
 * @param error
 * @param result
 * @param $
 */
var mainPageCB = function (error, result, $) {
    if (error) throw error;
    $("a.readmore.download").each(function(index, a){
        var dealURL = $(a).attr('href');
        Deals.queue(dealURL, dealPageCB, BASE_DOMAIN);
    });
};

Deals.queue('/en/credit-card-offers', mainPageCB);

