//middleware to check if user is logged in
module.exports = (req, res, next) => {
  //next signifies if middleware has finished to move on to next middleware
  if (!req.user) {
    return res.status(401).send({ error: 'Please log in first' });
    //401: unauthorized
  }

  next(); //continue if user is logged in
};
