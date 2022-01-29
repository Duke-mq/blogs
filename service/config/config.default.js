/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1641734775523_2402';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'blogs',
    },
    //是否加载
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf: {enable: false},
    domainWhiteList: ['http://127.0.0.1:3000','http://127.0.0.1:3001','http://127.0.0.1:7001']
  };
  config.cors = {
    // origin: '*'
    origin: 'http://localhost:3000', //只允许这个域进行访问接口
    credentials: true,   // 允许cookies可以跨域,session也是cookie的一种
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  return {
    ...config,
    ...userConfig,
  };
};
