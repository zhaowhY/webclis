'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};


exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

exports.email = {
  enable: true,
  package: 'egg-email',
};

