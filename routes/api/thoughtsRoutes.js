const router = require('express').Router();
const {
    getThoughts,
    createThought,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);


module.exports = router;