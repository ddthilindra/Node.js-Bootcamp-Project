const router=require('express').Router({mergeParams:true})
const reviewController = require('../../controllers/review')
const authMiddleware = require('../../middleware/auth')

// Advanced filter 'select', 'sort', 'page', 'limit'
const Review = require('../../models/review')
const advancedResults = require('../../middleware/advancedResult')

// /bootcamps/:bootcampId/reviews continue with here
router.get('/',advancedResults(Review,{path:'bootcamp',select:'name description'}),reviewController.getReviews)
router.get('/:id',reviewController.getReview)
router.post('/', authMiddleware.protect, authMiddleware.authorize('user','admin'), reviewController.addReview)
router.put('/:id', authMiddleware.protect, authMiddleware.authorize('user','admin'), reviewController.updateReview)
router.delete('/:id', authMiddleware.protect, authMiddleware.authorize('user','admin'), reviewController.deleteReview)

module.exports = router