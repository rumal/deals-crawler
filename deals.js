var Crawler = require("crawler"),
    _ = require("underscore");
//
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        console.error("Default callback");
    },
    userAgent : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0",
    onDrain : function(){
        dealAPI.export();
    }
});
var deals = [],
    requiredFields = ['title', 'sourceLink', 'description', 'tags'],
    defaultTags = ['credit'];

var dealAPI = {
    crawler : c,
    Deal : function(title, description, sourceLink, updatedTime, validTill, tags){
        var deal = {};
        deal.title = title;
        deal.description = description;
        deal.sourceLink = sourceLink;
        deal.updatedTime = updatedTime;
        deal.validTill = validTill;
        deal.tags = _.flatten(tags);
        return deal;
    },
    tag : defaultTags,
    add : function(deal){
        if (!_.isEmpty(_.difference(requiredFields, _.keys(deal)))){
            throw "Required fields are missing";
        }
        deal.tags = _.union(deal.tags, defaultTags);
        deals.push(deal);
    },
    export : function(){
        console.log(deals);
    }
}
module.exports = dealAPI;