/**
 * uploadRoutes.js
 * @description :: upload/download attachment routes
 */
  
const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../controller/client/v1/fileUploadController');

router.post('/client/api/v1/upload',fileUploadController.upload);

module.exports = router;