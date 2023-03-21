// const apiRoutes = require('./api');

// const router = require('express').Router();

// router.use('/api', apiRoutes);

// router.get('/homepage', (req, res) => {res.render('homepage')
// });


// module.exports = router;

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;