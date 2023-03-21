
const postpetRoutes = require('./postpetRoutes');
const userRoutes = require('./userRoutes');
const router = require('express').Router();



router.use('/postpets', postpetRoutes);
router.use('/users', userRoutes);




module.exports = router;