const { authenticateJWT } = require('../../middleware/middleware.js');
const { filter } = require('../../services/filter.js');
const { notification, chooseStatus } = require('../../services/notification.js');
const { personalInformation } = require('../../services/personalInformation.js');
const { getGarden } = require('../admin/admin.controller.js');
const { joinevent, addtasks, showTask } = require('./volunteer.controller.js');
const router = require('express').Router();


router.get('/filter',filter);
router.get('/notification',authenticateJWT,notification);
router.get('/chooseStatus',authenticateJWT,chooseStatus);
router.get('/personalInformation',authenticateJWT,personalInformation);
router.post('/event',authenticateJWT,joinevent);
router.get('/garden',authenticateJWT,getGarden);
router.post('/tasks',authenticateJWT,addtasks);
router.get('/showTask',authenticateJWT,showTask);
module.exports = router;



