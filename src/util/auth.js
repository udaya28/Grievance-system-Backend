const jwt = require('jsonwebtoken');
exports.isValidAuth = async (req, res, next) => {
  if (req.cookies.token) {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ status: 'fail' });
      }
      req.user = decodedToken.id;
      next();
    });
  } else {
    res.status(401).json({ status: 'fail' });
  }
};

exports.authLogout = async (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.status(200).send();
};
