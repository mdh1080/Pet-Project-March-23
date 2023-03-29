
const postpetRoutes = require('./postpetRoutes');
const userRoutes = require('./userRoutes');
const contactRoutes = require('./contactRoutes');
const router = require('express').Router();


router.use ('/contacts', contactRoutes);
router.use('/postpets', postpetRoutes);
router.use('/users', userRoutes);




module.exports = router;