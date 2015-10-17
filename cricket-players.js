var Questions = require('./questions.js')("http://www.starsports.com"),
    _ = require('underscore');


/**
 * Handle individual deal pages
 * @param error
 * @param result
 * @param $
 */
var playerCB = function (country, error, result, $) {
    if (error) throw error;

    var whoIsPlayerQuestion = [], whichTeamQuestion = [];
    var whoIsThePlayer = "Who is this player? ";
    var whichTeam = "What is the team this player represent?";


    //Get Questions without the answers field
    $(".ssr-series-squad-list-div").each(function(index, div){
        //Who is this player question
        var answer = $(".ssr-series-squad-container-list-name-text-div1", div).text();
        var image = $("img", div).attr('src');
        whoIsPlayerQuestion.push(Questions.Question(whoIsThePlayer, "", answer, image));


        //Which country question
        whichTeamQuestion.push(Questions.Question(whichTeam, "", country, image));
    });

    //Get random answers from the existing players
    var playerNames = _.map(whoIsPlayerQuestion, function(question){
        return question.answer;
    });

    //Player name
    _.each(whoIsPlayerQuestion, function(question){
        question.answers = _.sample(_.without(playerNames,question.answer), 3);
        question.answers.push(question.answer);
        question.answers = _.shuffle(question.answers).join(",");
        Questions.add(question);
    });


    //Which country question
    _.each(whichTeamQuestion, function(question){
        question.answers = _.sample(_.without(countries,question.answer), 3);
        question.answers.push(question.answer);
        question.answers = _.shuffle(question.answers).join(",");
        Questions.add(question);
    });


};

/**
 * Handles the main deal list pages
 * @param error
 * @param result
 * @param $
 */
var countryPlayersCB = function (error, result, $) {
    if (error) throw error;

    $(".playersTable a").each(function(index, a){
        var questionURL = $(a).attr('href');
        Questions.queue(questionURL, playerCB, BASE_DOMAIN);
    });
};

var countryIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 16, 21, 1188];
var countries = ['Australia', 'Bangladesh', 'England', 'India', 'New Zealand', 'Pakistan', 'South Africa', 'Sri Lanka', 'West Indies', 'Zimbabwe', 'Ireland', 'Scotland', 'United Arab Emirates', 'Afghanistan'];
_.each(countryIndex, function(index, i){
    Questions.queue('http://www.starsports.com/cricket/tour/tourid=164/seriesinstanceid=1869/teamid='+index+'/library/_seriessquaddetails.html',
        _.partial(playerCB, countries[i]));
});

///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=1/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=2/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=3/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=4/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=5/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=6/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=7/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=8/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=9/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=10/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=13/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=16/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=21/library
///cricket/tour/tourid=164/seriesinstanceid=1869/teamid=1188/library

