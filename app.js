var app = require('./index')
var debug = require('debug')('HPT:server')
const fs = require('fs')
const http = require('http')
const https = require('https')
const path = require('path');
var port = normalizePort(process.env.PORT || '443')
let server = '';
if(port==3000){
   server = http.createServer(app).listen(port, () => {
    console.log('http server running at ' + port)
  })
  server.on('error', onError)
  server.on('listening', onListening)
}else{
  const httpsOptions = {
    key: fs.readFileSync('../../../etc/ssl/nginx-selfsigned.key'),
    cert: fs.readFileSync('../../../etc/ssl/nginx-selfsigned.crt')
  }
   server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log('https server running at '+ port)
  })
  server.on('error', onError)
  server.on('listening', onListening)
}


//server.listen(port)
//server.listen(443)



function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {

  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
  console.log("server started on port" + addr.port)
}
