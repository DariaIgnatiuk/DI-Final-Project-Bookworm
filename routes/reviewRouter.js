const {Router} = require ('express');
const reviewController = require('../controllers/reviewController.js');

const router = Router();

router.post('/add', reviewController.addReview);
// router.post('/login', userController.loginUser);
// router.delete('/logout',  userController.logoutUser);
// router.get('/auth', verifyToken, userController.verifyAuth)

module.exports = router;
