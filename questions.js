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
    questions = [];

var dealAPI = {
    Question : function(question, answers, answer, image){
        var ques = {};
        ques.question = question;
        ques.answers = answers;
        ques.answer = answer;
        ques.image = image;
        return ques;
    },
    add : function(question){
        questions.push(question);
    },
    export : function(){
        console.log(questions);
    },
    queue : function(uri, callback){
        c.queue({uri : toAbsoluteURL(uri, baseDomain), callback : callback});
    }
}
module.exports = function(){
    return dealAPI;
};