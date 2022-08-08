module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define("cities",{
         
        id :{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
       },

        city:{ 
            type:DataTypes.STRING,
             allowNull:false
        }
      
    })
    return City
}