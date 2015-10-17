/**
 * Created by pasindu on 3/16/15.
 */

var Crawler = require("crawler"),
    _ = require('underscore'),
    fs = require('fs');

var BASE = 'http://lankaconnections.com/';
var emails = [];

c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
//        console.log("Loading %s",result.uri);

        var currentEmails = result.body.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        var uniqEmails = _.difference(currentEmails,emails)
        emails = _.union(emails, currentEmails);
        if (uniqEmails.length>0){
            console.log(uniqEmails.join('\n')+"\n");
//            fs.appendFileSync('emails.txt',uniqEmails.join('\n')+"\n");
        }


        $('a').each(function(index, a) {
            var toQueueUrl = $(a).attr('href');
            if (!toQueueUrl) return;
            if (toQueueUrl.indexOf('http') == -1){
                toQueueUrl = BASE + toQueueUrl;
            }

            if ( toQueueUrl.indexOf(BASE)>-1)
                c.queue(toQueueUrl);
        });
    },
    skipDuplicates : true,
    userAgent : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
});

c.queue(BASE);

