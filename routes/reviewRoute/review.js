const router=require('express').Router({mergeParams:true})
const reviewController = require('../../controllers/review')
const authMiddleware = require('../../middleware/auth')

// Advanced filter 'select', 'sort', 'page', 'limit'
const Review = require('../../models/review')
const advancedResults = require('../../middleware/advancedResult')

// /bootcamps/:bootcampId/reviews continue with here
router.get('/',advancedResults(Review,{path:'bootcamp',select:'name description'}),reviewController.getReviews)
// router.post('/', authMiddleware.protect, authMiddleware.authorize('publisher','admin'), reviewController.addreview)

router.get('/:id',reviewController.getReview)
// router.put('/:id', authMiddleware.protect, authMiddleware.authorize('publisher','admin'), reviewController.updatereview)
// router.delete('/:id', authMiddleware.protect, authMiddleware.authorize('publisher','admin'), reviewController.deletereview)

module.exports = router