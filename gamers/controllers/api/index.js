const router = require('express').Router();
const dashRoutes = require('./dashRoutes');
const userRoutes = require('./userRoutes');

//middleware

router.use('/dash', dashRoutes);
router.use('/users', userRoutes);

module.exports = router;