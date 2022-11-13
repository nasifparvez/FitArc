const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(err => {
  if(err && err.message) {
    // can put a switch statement here for specific database error
    res.status(400).json({error: err, message: err.message})
  } else {
    res.status(500).json({error: err, message: "error without message"})
  }
})

module.exports = catchErrors
