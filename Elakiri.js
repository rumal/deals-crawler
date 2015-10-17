/**
 * Created by pasindu on 3/16/15.
 */

var Crawler = require("crawler"),
    _ = require('lodash'),
    fs = require('fs');

c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        var username = $('#username_box > h1');
        console.log(_.trim(username.text()));
    },
    skipDuplicates : true,
    userAgent : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
});

_.each(_.range(430001,528853), function(i){
    c.queue('http://www.elakiri.com/forum/member.php?u='+i);
})

