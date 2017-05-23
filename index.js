var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '9b119c1e-2bd9-4b01-9d35-d064de45c126',
    appPassword: 'XapBssL6f0e65qZzLpKw2rO'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
// var bot = new builder.UniversalBot(connector, function (session) {
//     session.send("You said: %s", session.message.text);
// });


let bot = new builder.UniversalBot(connector)


//METHOD 1 Create our root dialog capable of handling any incoming messages
bot.dialog('/', [step1, step2, step3])

function step1(session) {
    builder.Prompts.text(session, "What is your name?")
}

//Store the name inside session.userData.name where name = our key
function step2(session, results) {
    session.userData.name = results.response
    builder.Prompts.text(session, "Got it!, Your name is " + session.userData.name + "  \nWhat is your website url?")
}

//Retrieve the stored data using session.userData.name where name was the key containing our value
function step3(session, results) {
    session.endDialog("Got it!, Your website url is %s \nThank you! %s", results.response, session.userData.name)
}