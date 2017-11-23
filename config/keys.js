//Decide which keys to use ( prod / dev )
//read node_env from heroku
if (process.env.NODE_ENV === 'production') {
  //will be prod if on heroku
  //return prod keys
  module.exports = require('./prod'); //export prod set of keys for rest of the app to use
} else {
  //will be dev if hosted on local machine
  //return dev keys
  module.exports = require('./dev'); //export dev set of keys for rest of the app to use
}
