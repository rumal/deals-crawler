var Crawler = require("crawler"),
    _ = require("underscore");
    _.str = require("underscore.string");
//

function toAbsoluteURL (url, base) {
    if (_.str.startsWith(url, "http")){
        return url;
    }else{
        return base + url;
    }
}


var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        throw "Default callback is called.";
    },
    userAgent : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
    onDrain : function(){
        dealAPI.export();
    }
}),
    baseDomain,
    deals = [],
    requiredFields = ['title', 'sourceLink', 'description', 'tags'],
    defaultTags = [];

var dealAPI = {
    Deal : function(title, description, partner, sourceLink, updatedTime, validity, tags){
        var deal = {};
        deal.title = title;
        deal.description = description;
        deal.partner = partner;
        deal.sourceLink = sourceLink;
        deal.updatedTime = updatedTime;
        deal.validity = validity;
        deal.tags = _.flatten(tags);
        return deal;
    },
    add : function(deal){
        if (!_.isEmpty(_.difference(requiredFields, _.keys(deal)))){
            throw "Required fields are missing";
        }
        deal.tags = _.union(deal.tags, defaultTags);
        deals.push(deal);
    },
    export : function(){
        console.log(deals);
    },
    queue : function(uri, callback){
        c.queue({uri : toAbsoluteURL(uri, baseDomain), callback : callback});
    }
}
module.exports = function(base, tags){
    baseDomain = base;
    defaultTags = tags;
    return dealAPI;
};