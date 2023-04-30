const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtsRouter = require('./thoughtsRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRouter);

module.exports = router;