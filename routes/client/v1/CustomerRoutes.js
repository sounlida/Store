/**
 * CustomerRoutes.js
 * @description :: CRUD API routes for Customer
 */

const express = require('express');
const router = express.Router();
const CustomerController = require('../../../controller/client/v1/CustomerController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/customer/create').post(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.addCustomer);
router.route('/client/api/v1/customer/list').post(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.findAllCustomer);
router.route('/client/api/v1/customer/count').post(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.getCustomerCount);
router.route('/client/api/v1/customer/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.getCustomer);
router.route('/client/api/v1/customer/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.updateCustomer);    
router.route('/client/api/v1/customer/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.partialUpdateCustomer);
router.route('/client/api/v1/customer/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.softDeleteCustomer);
router.route('/client/api/v1/customer/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.softDeleteManyCustomer);
router.route('/client/api/v1/customer/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.bulkInsertCustomer);
router.route('/client/api/v1/customer/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.bulkUpdateCustomer);
router.route('/client/api/v1/customer/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.deleteCustomer);
router.route('/client/api/v1/customer/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,CustomerController.deleteManyCustomer);

module.exports = router;
