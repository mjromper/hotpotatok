
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  // opentok:
  , opentok = require('opentok')
  , OPENTOK_API_KEY = '22429382' // add your API key here
  , OPENTOK_API_SECRET = 'f7946ca3330bc596bc5ad89fb87005e8ecb0ef7b'; // and your secret here


// create a single instance of opentok sdk.
var ot = new opentok.OpenTokSDK(OPENTOK_API_KEY,OPENTOK_API_SECRET)

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  var _sessionId = ot.sessionId;
  var _token = ot.generateToken({
            'connection_data': "userid_" + new Date().getTime(),
            'role': "publisher"
          });

  res.render('index', { title: 'Hot Potato', token: _token, sessionId: _sessionId, apikey: OPENTOK_API_KEY });
});

app.get('/users', user.list);



// for our example, we're just creating a single global session, and will generate
// a unique token for each page request

ot.createSession('localhost',{},function(sessionId){
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
    console.log("Session Created ("+sessionId+"), server running on port"+app.get('port'));
  });  
})
