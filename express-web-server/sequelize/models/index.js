const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname + '/..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize; // 다른 곳에서 Sequelize 객체를 사용하도록 db에 넣어줌

db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

db.User.hasMany(db.Comment, {foreignKey : 'commenter', sourceKey : 'id'});
db.Comment.belongsTo(db.User, { foreignKey : 'commenter', targetKey : 'id'});

module.exports = db;
