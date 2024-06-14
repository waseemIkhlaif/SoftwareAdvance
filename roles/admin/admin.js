const express = require('express');
const {addGarden,getGarden,deactivateUser, selectfeatured} = require('./admincontroller.js');
const { updateuser } = require('../users/user.controller.js');
const { authenticateJWT } = require('../../middleware/middleware.js');
const { personalInformation } = require('../../services/personalInformation');
const app = express();
app.post('/garden',authenticateJWT,addGarden);
app.get('/garden',authenticateJWT,getGarden);//view users 
app.patch('/:email',authenticateJWT,updateuser); //update user 
app.put('/status',authenticateJWT,deactivateUser);
app.get('/notification',authenticateJWT,notification);
app.post('/chooseStatus',authenticateJWT,chooseStatus);
app.get('/personalInformation',authenticateJWT,personalInformation);
app.post('/selectfeatured',authenticateJWT,selectfeatured);
module.exports= app 
////////////////////////////////
