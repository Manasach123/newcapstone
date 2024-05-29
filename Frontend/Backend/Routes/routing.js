const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

router.post('/signup', userController.signup);
router.get('/user',userController.getUser);
router.post('/login', userController.login);
router.put('/profile',userController.verifyJWT,userController.profile);
router.post('/profile/picture', userController.verifyJWT,userController.profile_picture);
router.post('/communities',userController.community);
router.delete("/admin/communities/:communityId", userController.verifyJWT,userController.delete_community);
router.delete("/admin/users/:userId",userController.verifyJWT,userController.delete_user);
router.put("/admin/users/:userId",userController.verifyJWT,userController.edit_user_details);
router.put("/admin/communities/:communityId", userController.verifyJWT,userController.edit_community_details); 
router.post('/resources',userController.share_resource);
router.post('/communities/:communityId/join', userController.verifyJWT,userController.join_community);

module.exports = router;
