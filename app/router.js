const router = require('express').Router();

const commentsRoute = require('./routes/comments-route');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to vibeguru API' });
});

router.use('/comments', commentsRoute);

module.exports = router;
