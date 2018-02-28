var http = require('http');
var Twit = require('twit');
var express = require('express');
var config = require('./config');
//var vinceTweets = require('./vincetweets');
var T = new Twit(config);
/*
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})
*/
var stream = T.stream('user');
console.log ("we are streaming!");
//stream.on('tweet', tweet);
stream.on('follow', followed);
stream.on('unfollow', unfollow);
stream.on('disconnect', disconnect);


function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(100));
}

// function tweet(eventMsg) {
//   console.log('tweet function called');
//   console.log(eventMsg);
//   var name = eventMsg.source.name;
//   var screenName = eventMsg.source.screen_name;
//   console.log(name);
//   console.log(screenName);
//   if (screenName != "mambogoose") {
//     tweetIt('@' + screenName + 'What a well-constructed thought!');
//     console.log('follow event happened with ' + screenName);
//     }
//};
function followed(eventMsg) {
  console.log('follow function called');
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetIt(getRandomInt() + ' @' + screenName + ' wow, you are amazing, ' + name + '. Get ready for the ride of your loife!' + getRandomInt());
  console.log("follow event happened with " + screenName);
}

function unfollow(eventMsg) {
  console.log('unfollow function called');
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetIt('.@' + screenName + ' just unfollowed me. I am distraught.');
  console.log("unfollow event happened with " + screenName);
}

function disconnect(eventMsg) {
  console.log('disconnect function called');
}

function tweetIt(txt) {
  var tweet = {
    status: txt
  }
  T.post('statuses/update', tweet, tweeted);
}
var d = Date.now();
//tweet vince once an minute to start, then hourly, then every two hours. 1000millis * 60secs * 120min
setInterval(function(){
tweetIt('@vini_io ' + Date.now() + ' ' + getVinceTweet())}, 1000*60*120);

function getVinceTweettest() {
    var vinceTweets = [
      "Hey Vinny G! this issome garbage text",
      "Hey Buddy, this is more garbage?",
      "another garbage? yep",
      "It's probably some more garbage",
      "Lemme get a couple of those garbages",
      "gaaaaaaaaarrrrrrrbbbbaaaaaaaggggeeeeeeeeee!!!",
      "Hey, do you have garbage's phone number? he seems like a cool guy.",
      "Why do so many people watch this washed up player? He is so bad at this game. Why is his hair so long? Does hair length have a connection to a players skill?  Is that why girls are so bad at league?"
    ];
    return vinceTweets[Math.floor(Math.random() * vinceTweets.length)];
  };

function getVinceTweet() {
    var vinceTweets = [
      "Hey Vinny G! It's your pal Mambo Goose!",
      "Hey Buddy, how many mustards are there?",
      "ayyyeeeee la ma ooooo (cest oui francais, baybee)",
      "It's probably not a good idea if you come over",
      "Lemme get a couple of those tortwillas",
      "reeeeeeeeee!!!",
      "How come I see so many Trumpets!?!",
      "Thas It!",
      "Hey, do you have John Harden's phone number? he seems like a cool guy.",
      "Why do so many people watch this washed up player? He is so bad at this game. Why is his hair so long? Does hair length have a connection to a players skill?  Is that why girls are so bad at league?"
    ];
    return vinceTweets[Math.floor(Math.random() * vinceTweets.length)];
  };

function tweeted(err,data,response) {
  if (err) {
    console.log("error during tweeted function")
    console.log(err);
  } else {
    console.log("Tweeted Function Worked!");
  }
}
