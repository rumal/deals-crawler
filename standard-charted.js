var BASE_DOMAIN = "https://www.sc.com/";


var Deals = require('./deals.js')(BASE_DOMAIN, ['credit-card', 'standard-charted']),
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

//Deals.queue('/lk/credit-cards/latest-promotions/en/#', function (error, result, $) {
//
//
//});
Deals.queue('https://www.sc.com/lk/credit-cards/latest-promotions/dine_i_style/en/', function (error, result, $) {
    if (error) throw error;

    //Add relative sub offer pages
    $("#pro_line > div").each(function(index, div){
        var title = $("p", div).text();
        var description = ""
        var sourceLink = result.uri;
        var updatedTime = +new Date();
        var tags = [];
        var validity = "";
        var partner = "";
        var imgSelector = "img";

        if (!title) return;

        var deal = Deals.Deal(title, description , partner, sourceLink, updatedTime, validity, tags);
        if ($(imgSelector, div).attr('src'))
            deal.image = $(imgSelector, div).attr('src');

        Deals.add(deal);
    });
});