var Questions = require('./questions.js')("http://www.espncricinfo.com/"),
    _= require('underscore');
_.str = require("underscore.string");


var playerCB = function (error, result, $) {
    if (error) throw error;

    var whichGroundQuestions = [],groundCapacityQuestions = [], groundVenuesQuestions = [];
    var whichGround = "Which ground is this? ";
    var groundCapacityQuestion;
    var groundVenueQuestion;



    //Get Questions without the answers field
    $(".large-block-grid-2 li").each(function (index, div) {
        //Who is this player question
        //var groundName = _.str.clean($("h3", div).text());
        var groundName = _.str.clean($("h3 a", div).text());
        var image = $("img", div).attr('src');
        whichGroundQuestions.push(Questions.Question(whichGround, "", groundName, image));

        groundCapacityQuestion = "What is capacity of ground " + groundName + "?";
        var capacity = $(".small-9 > span:last-child", div).text();
        capacity = _.str.strRightBack(capacity, ":");
        groundCapacityQuestions.push(Questions.Question(groundCapacityQuestion,"", capacity , image));

    });

    var groundNames = _.map(whichGroundQuestions, function(question){
        return question.answer;
    });

    var capacities = _.map(groundCapacityQuestions, function(question){
        return question.answer;
    });

    //Ground names
    _.each(whichGroundQuestions, function(question){
        question.answers = _.sample(groundNames, 3);
        question.answers.push(question.answer);
        question.answers = _.shuffle(question.answers).join(",");
        Questions.add(question);
    });

    //all ground capacities
    _.each(groundCapacityQuestions, function(question){
        question.answers = _.sample(capacities, 3);
        question.answers.push(question.answer);
        question.answers = _.shuffle(question.answers).join(",");
        Questions.add(question);
    });

}

Questions.queue('http://www.espncricinfo.com/icc-cricket-world-cup-2015/content/series/509587.html?template=ground',
    playerCB);
