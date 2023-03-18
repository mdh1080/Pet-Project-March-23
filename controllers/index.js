const apiRoutes = require('./api');

const router = require('express').Router();

router.use('/api', apiRoutes);

router.get('/main', (req, res) => {res.render('main')
});


module.exports = router;