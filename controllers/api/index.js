const comment = require('./postpetRoutes');
const postpetRoutes = require('./postpetRoutes');
const userRoutes = require('./userRoutes');


const Sequelize = require('sequelize');
const router = require('express').Router();
const sequelize = require('../../config/connection');


router.use('/comment', postpetRoutes);
router.use('/postpets', postpetRoutes);
router.use('/users', userRoutes);




module.exports = router;