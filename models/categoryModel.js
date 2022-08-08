module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("categories",{

       category_c_id :{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
       },
         
        c_name:{ 
            type:DataTypes.STRING,
             allowNull:false,
        },
        createdAt:{ 
            type:DataTypes.DATE,
             allowNull:true,
        },
        updatedAt:{ 
            type:DataTypes.DATE,
             allowNull:true,
        },
      
    })
    return Category
}