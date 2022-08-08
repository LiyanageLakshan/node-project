const dbConfig = require('../config/database');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,{
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

     pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
     }

    }
)

sequelize.authenticate()
 .then(() => {
    console.log('connected..')

 })
 .catch(err => {
    console.log('Error'+ err)
 })

 const db = {}

 db.Sequelize = Sequelize
 db.sequelize = sequelize

 db.seller = require('./sellerModel')(sequelize, DataTypes)
 db.items = require('./itemModel')(sequelize, DataTypes)
 db.category = require('./categoryModel')(sequelize, DataTypes)
 db.city = require('./cityModel')(sequelize, DataTypes)

 db.sequelize.sync({force: false})

  .then(() =>{
    console.log('yes re-sync done!')
  });

   db.city.hasMany(db.items, {
   foreignKey:'city_city_id',
   
   });

   db.items.belongsTo(db.city,{
   foreignKey:'city_city_id',
 
  });

  db.category.hasMany(db.items,{
        foreignKey:'category_c_id',
  });
  db.items.belongsTo(db.category,{
     foreignKey:'category_c_id',
  });
  
  db.seller.hasMany(db.items,{
   foreignKey:'seller_s_id'
   });
   db.items.belongsTo(db.seller,{
   foreignKey:'seller_s_id'
  });



  module.exports = db