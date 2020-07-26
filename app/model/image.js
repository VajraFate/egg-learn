'use strict';

module.exports = app => {
  const sequlize = app.Sequelize;
  const Image = app.model.define('images', {
    id: {
      type: sequlize.INTEGER,
      autoIncrement: true,
    },
    data: {
      type: sequlize.BLOB,
    },
    name: {
      type: sequlize.STRING(50),
      primaryKey: true,
    },
    url: sequlize.STRING(100),
  });
  return Image;
};

