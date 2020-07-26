'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/logo', controller.home.logo);
  router.get('/getTest', controller.home.getTest);
  router.resources('/user', '/user', controller.user);
  router.post('/image', controller.image.create);
  router.post('/upload', controller.image.upload);
  router.get('/image/:name', controller.image.getImage);
};
