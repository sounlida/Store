/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */
const model = require('../model');
const dbService = require('../utils/dbService');
const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const { replaceAll } = require('../utils/common');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Linnea.Lebsack' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'lk8jTBNhuNXwk9W',
        'isDeleted':false,
        'username':'Linnea.Lebsack',
        'email':'Martin.Koss@yahoo.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'lk8jTBNhuNXwk9W',
        'isDeleted':false,
        'username':'Linnea.Lebsack',
        'email':'Martin.Koss@yahoo.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Linnea.Lebsack' }, userToBeInserted);
    }
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Rachael.Gerlach93' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'i7YL_JUqZA9TUKZ',
        'isDeleted':false,
        'username':'Rachael.Gerlach93',
        'email':'Ephraim_Lubowitz@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'i7YL_JUqZA9TUKZ',
        'isDeleted':false,
        'username':'Rachael.Gerlach93',
        'email':'Ephraim_Lubowitz@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Rachael.Gerlach93' }, userToBeInserted);
    }
    console.info('User model seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
  
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'Admin', 'System_User', 'User' ];
    const insertedRoles = await dbService.findAll(model.role, { code: { $in: roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.createMany(model.role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes) {
      let routeName = '';
      const dbRoutes = await dbService.findAll(model.projectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.createMany(model.projectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/address/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/address/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/address/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/address/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/address/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/address/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/address/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/address/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/address/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/address/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/address/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/address/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/address/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/address/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/address/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/address/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/address/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/address/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/address/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/address/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/address/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/address/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/address/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/address/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/banner/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/banner/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/banner/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/banner/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/banner/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/banner/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/banner/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/banner/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/banner/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/banner/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/banner/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/banner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/banner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/banner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/banner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/banner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/banner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/banner/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/banner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cart/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cart/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cart/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cart/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/cart/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/cart/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cart/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/cart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cart/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cart/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cart/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/cart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/cart/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cartitem/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cartitem/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cartitem/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/cartitem/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/cartitem/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/cartitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/cartitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cartitem/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/cartitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/cartitem/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cartitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/category/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/category/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/category/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/category/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/category/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/category/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/category/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/city/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/city/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/city/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/city/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/city/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/city/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/city/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/city/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/city/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/city/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/city/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/city/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/city/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/city/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/city/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/city/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/city/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/city/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/city/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/city/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/city/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/city/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/city/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/city/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/country/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/country/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/country/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/country/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/country/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/country/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/country/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/country/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/country/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/country/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/country/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/country/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/country/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/country/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/country/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/country/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/country/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/country/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/country/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/country/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/country/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/country/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/country/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/country/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/image/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/image/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/image/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/image/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/image/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/image/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/image/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/image/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/image/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/image/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/image/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/image/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/image/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/image/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/image/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/order/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/order/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/order/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/orderitem/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/orderitem/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/orderitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/orderitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/orderitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/orderitem/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pincode/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/pincode/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/pincode/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/pincode/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pincode/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/pincode/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/pincode/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/pincode/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/pincode/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/pincode/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/pincode/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/pincode/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pincode/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/pincode/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pincode/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/pincode/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pincode/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/pincode/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pincode/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/pincode/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pincode/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/pincode/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/pincode/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/pincode/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/product/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/product/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/product/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/product/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/product/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/product/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/product/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/product/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/product/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/product/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/product/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/product/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/product/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/product/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/shipping/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/shipping/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/shipping/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/shipping/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/shipping/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/shipping/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/shipping/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/shipping/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/shipping/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/shipping/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/shipping/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/shipping/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/shipping/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/shipping/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/shipping/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/shipping/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/shipping/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/shipping/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/shipping/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/shipping/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/shipping/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/shipping/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/shipping/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/shipping/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/state/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/state/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/state/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/state/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/state/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/state/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/state/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/state/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/state/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/state/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/state/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/state/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/state/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/state/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/state/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/state/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/state/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/state/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/state/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/state/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/state/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/state/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/state/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/state/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallet/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/wallet/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/wallet/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/wallet/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallet/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/wallet/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallet/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/wallet/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallet/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/wallet/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallet/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/wallet/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallet/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/wallet/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/wallet/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallettransaction/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/wallettransaction/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallettransaction/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/wallettransaction/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallettransaction/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/wallettransaction/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallettransaction/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/wallettransaction/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/wallettransaction/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/wallettransaction/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallettransaction/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/wallettransaction/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallettransaction/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/wallettransaction/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallettransaction/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/wallettransaction/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallettransaction/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/wallettransaction/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallettransaction/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/wallettransaction/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallettransaction/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/wallettransaction/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/wallettransaction/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/wallettransaction/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/customer/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/customer/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/customer/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/customer/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/address/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/address/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/address/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/address/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/address/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/address/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/address/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/address/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/address/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/address/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/address/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/address/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/address/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/address/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/address/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/address/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/address/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/address/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/address/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/address/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/address/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/address/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/address/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/address/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/banner/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/banner/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/banner/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/banner/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/banner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/banner/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cart/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/cart/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cart/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/cart/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cart/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/cart/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cart/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/cart/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/cart/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/cart/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cart/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/cart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/cart/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cartitem/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cartitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cartitem/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cartitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cartitem/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cartitem/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cartitem/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/cartitem/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/cartitem/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cartitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cartitem/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cartitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cartitem/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cartitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cartitem/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cartitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cartitem/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cartitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cartitem/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cartitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cartitem/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/cartitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/cartitem/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cartitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/category/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/city/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/city/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/city/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/city/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/city/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/city/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/city/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/city/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/city/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/city/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/city/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/city/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/city/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/city/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/city/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/city/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/city/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/city/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/city/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/city/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/city/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/city/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/city/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/city/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/country/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/country/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/country/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/country/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/country/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/country/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/country/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/country/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/country/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/country/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/country/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/country/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/country/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/country/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/country/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/country/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/country/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/country/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/country/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/country/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/country/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/country/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/country/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/country/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/image/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/image/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/image/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/image/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/image/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/image/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/image/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/order/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/order/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/order/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/order/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/order/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/order/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/orderitem/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/orderitem/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/orderitem/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/orderitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/orderitem/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/orderitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pincode/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pincode/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pincode/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pincode/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pincode/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/pincode/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pincode/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/pincode/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pincode/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pincode/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pincode/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pincode/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pincode/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pincode/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pincode/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pincode/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pincode/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pincode/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pincode/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pincode/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pincode/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pincode/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pincode/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pincode/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/product/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/product/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/product/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/product/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/product/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/shipping/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/shipping/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/shipping/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/shipping/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/shipping/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/shipping/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/shipping/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/shipping/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/shipping/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/shipping/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/shipping/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/shipping/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/shipping/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/shipping/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/shipping/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/shipping/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/shipping/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/shipping/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/shipping/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/shipping/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/shipping/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/shipping/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/shipping/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/shipping/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/state/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/state/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/state/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/state/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/state/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/state/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/state/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/state/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/state/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/state/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/state/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/state/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/state/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/state/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/state/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/state/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/state/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/state/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/state/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/state/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/state/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/state/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/state/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/state/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallet/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallet/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallet/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallet/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallet/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/wallet/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallet/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/wallet/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/wallet/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/wallet/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallet/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallet/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallet/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallet/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallet/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallet/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallet/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallet/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallet/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallet/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallet/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/wallet/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/wallet/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallet/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallettransaction/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallettransaction/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallettransaction/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallettransaction/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallettransaction/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallettransaction/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallettransaction/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/wallettransaction/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/wallettransaction/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallettransaction/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallettransaction/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallettransaction/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallettransaction/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallettransaction/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallettransaction/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallettransaction/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallettransaction/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallettransaction/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallettransaction/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallettransaction/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/wallettransaction/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/wallettransaction/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/wallettransaction/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/wallettransaction/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/customer/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/customer/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/customer/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/customer/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/address/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/address/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/address/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/address/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/address/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/address/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/address/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/address/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/address/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/address/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/address/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/address/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/address/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/address/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/address/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/address/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/address/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/address/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/address/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/address/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/address/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/address/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/address/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/address/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/banner/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/banner/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/banner/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/banner/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/banner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/banner/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cart/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cart/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cart/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/cart/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/cart/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cart/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cart/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/cart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/cart/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/cartitem/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/cartitem/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cartitem/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/cartitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/cartitem/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cartitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/category/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/city/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/city/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/city/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/city/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/city/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/city/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/city/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/city/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/city/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/city/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/city/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/city/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/city/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/city/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/city/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/city/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/city/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/city/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/city/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/city/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/city/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/city/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/city/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/city/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/country/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/country/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/country/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/country/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/country/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/country/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/country/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/country/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/country/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/country/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/country/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/country/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/country/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/country/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/country/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/country/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/country/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/country/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/country/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/country/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/country/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/country/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/country/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/country/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/image/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/image/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/image/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/image/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/image/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/image/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/image/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/image/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/image/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/image/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/image/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/image/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/image/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/image/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/image/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/image/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/image/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/image/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/image/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/image/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/image/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/image/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/image/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/image/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/order/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/order/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/order/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/order/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/order/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/order/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/order/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/orderitem/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/orderitem/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/orderitem/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/orderitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/orderitem/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/orderitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pincode/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pincode/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pincode/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pincode/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pincode/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/pincode/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pincode/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/pincode/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/pincode/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pincode/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pincode/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pincode/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pincode/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pincode/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pincode/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pincode/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pincode/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pincode/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pincode/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pincode/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pincode/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pincode/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pincode/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pincode/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/product/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/product/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/product/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/product/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/product/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/product/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/product/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/shipping/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/shipping/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/shipping/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/shipping/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/shipping/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/shipping/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/shipping/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/shipping/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/shipping/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/shipping/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/shipping/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/shipping/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/shipping/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/shipping/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/shipping/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/shipping/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/shipping/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/shipping/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/shipping/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/shipping/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/shipping/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/shipping/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/shipping/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/shipping/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/state/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/state/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/state/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/state/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/state/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/state/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/state/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/state/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/state/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/state/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/state/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/state/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/state/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/state/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/state/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/state/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/state/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/state/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/state/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/state/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/state/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/state/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/state/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/state/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallet/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallet/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallet/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallet/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallet/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/wallet/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallet/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/wallet/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/wallet/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/wallet/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallet/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallet/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallet/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallet/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallet/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallet/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallet/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallet/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallet/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallet/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallet/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/wallet/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/wallet/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallet/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallettransaction/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallettransaction/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallettransaction/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallettransaction/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallettransaction/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallettransaction/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallettransaction/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/wallettransaction/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/wallettransaction/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallettransaction/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallettransaction/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallettransaction/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallettransaction/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallettransaction/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallettransaction/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallettransaction/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallettransaction/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallettransaction/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallettransaction/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallettransaction/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/wallettransaction/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/wallettransaction/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/wallettransaction/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/wallettransaction/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/customer/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/customer/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/customer/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/customer/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'Admin', 'System_User', 'User' ];
      const insertedProjectRoute = await dbService.findAll(model.projectRoute, {
        uri: { $in: routes },
        method: { $in: routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findAll(model.role, {
        code: { $in: roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};
    
      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(model.routeRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.createMany(model.routeRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Linnea.Lebsack',
      'password':'lk8jTBNhuNXwk9W'
    },{
      'username':'Rachael.Gerlach93',
      'password':'i7YL_JUqZA9TUKZ'
    }];
    const defaultRoles = await dbService.findAll(model.role);
    const insertedUsers = await dbService.findAll(model.user, { username: { $in: userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN').id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER').id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER').id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(model.userRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.createMany(model.userRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('UserRole seeder failed due to ', error.message);
  }
}

/* calls of functions to seed mock data into multiple collections */
async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;