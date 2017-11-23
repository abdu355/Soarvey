//middleware to check if user has enough credits
module.exports = (req, res, next) => {
  //next signifies if middleware has finished to move on to next middleware
  if (req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits :(' });
    //403: forbidden
  }

  next(); //continue if user has more than or equal to 1 credit(s)
};
