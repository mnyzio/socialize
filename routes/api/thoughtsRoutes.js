const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;