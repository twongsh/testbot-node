var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment
var botConnectorOptions = { 
    appId: '9104ffc6-f1d1-45c7-acde-61d9efe69a92',
    appPassword:'xLWqGFGikaNEgxLnMAmQ0uy'
};

// Create bot
var connector = new builder.ChatConnector(botConnectorOptions);
var bot = new builder.UniversalBot(connector);

bot.dialog('/', function (session) {
    
    //respond with user's message
    //this will send you said+what ever user says.
    session.send("You said " + session.message.text);
});

// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
/*here we are giving path as "/api/messages" because during the process of regi9stering bot we have given end point URL as "azure qwebapp url/api/messages" if you want to give some other url give the same url whatever you give in the endpoint excluding azure webapp url */
server.post('/api/messages', connector.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
        'directory': '.',
        'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
