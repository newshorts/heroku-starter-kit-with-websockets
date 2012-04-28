require(__dirname  + '/js/lib/helper.js');

var express = require('express'),
    url = require('url'),
    fs = require('fs'),
    sys = require('util');

var app = express.createServer();

var port = process.env.PORT || 3000;

console.log(process.env);

app.listen(port, function() {
    
  console.log("Listening on " + port);
  
});

var io = require('socket.io').listen(app);
    

   
/*
 *
 *  Configuration settings for IO and Express 
 * 
 */
   
io.enable('browser client minification');  // send minified client
io.enable('browser client etag');          // apply etag caching logic based on version number
io.enable('browser client gzip');          // gzip the file
io.set('log level', 1);                    // reduce logging
io.set('transports', [                     // enable all transports (optional if you want flashsocket)
    'websocket'
  , 'flashsocket'
  , 'htmlfile'
  , 'xhr-polling'
  , 'jsonp-polling'
]);

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'stuff'}));

app.get('/*.*', function(req, res) {

    var options = url.parse(req.url, true);

    var mime = Helper.getMime(options);
    
    serveFile(res, options.pathname, mime);

});

app.get('/', function(req, res) {
    
    var path = 'index.html';
    
    serveFile(res, path);

});

io.sockets.on('connection', function (socket) {
    
    var id = socket.id;
     
    socket.emit('update', {connection: "able to establish a connection with the server!", members: id});
    
    socket.on('connected', function(data) {
        
        if(data != undefined) {
            
            io.sockets.emit('update', data);
            
        } 
        
    });
    
});

sys.puts("http server running at: http://127.0.0.1:"+port+"/");

function serveFile(res, pathName, mime) {
    
    mime = mime || 'text/html';
    
    fs.readFile(__dirname + '/' + pathName, function (err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end('Error loading ' + pathName + " with Error: " + err);
        }
        res.writeHead(200, {"Content-Type": mime});
        res.end(data);
    });
}

