var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var app = express()
var busboy = require('connect-busboy');
var cors = require('cors')
var routesApi = require('./routes')
var constants = require('./config/constants')
const db = require('./config/database'); 
var compress = require('compression');

app.use(compress());
app.set('view engine', 'jade');
app.use(logger('dev'))
app.use(cookieParser())
app.use(busboy({ immediate: true }));
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))
//app.use(cors({}))
app.use(cors({credentials: true, origin: constants.clientUrl}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routesApi);
app.use(express.static('tmp'))
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handlers development error handler
if (app.get('env') !== 'development') {
    app.use(function(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
          res.status(401)
          res.json({"message" : err.name + ": " + err.message})
        } else {
          res.status(err.status || 500)
          res.render('error', {
              message: err.message,
              error: err
          })
        }
    })
}

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

// production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})

module.exports = app