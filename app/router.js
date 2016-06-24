const router = require('express').Router();

const vibesRouter = require('./routes/vibes-route');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to vibeguru API' });
});

router.use('/vibes', vibesRouter);

module.exports = router;
