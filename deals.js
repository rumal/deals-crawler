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
    skipDuplicates : true,
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
        deal.title = _.str.clean(title);
        deal.description = _.str.dedent(description);
        deal.partner = _.str.clean(partner);
        deal.sourceLink = sourceLink;
        deal.updatedTime = updatedTime;
        deal.validity = _.str.clean(validity);

        tags = _.map(tags, function(tag){
            return _.str.slugify(tag);
        });
        deal.tags = _.flatten(tags);

        return deal;
    },
    add : function(deal){
        deal.tags = _.union(deal.tags, defaultTags);

        if (deal.image)
            deal.image = toAbsoluteURL(deal.image, baseDomain);

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