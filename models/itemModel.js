module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define("items",{
         
        i_name:{ 
            type:DataTypes.STRING,
             allowNull:false
        },
        i_price:{ 
            type:DataTypes.INTEGER,
             allowNull:false
        },
        i_topic:{ 
            type:DataTypes.STRING,
             allowNull:false
        },
        con_number:{ 
            type:DataTypes.INTEGER,
             allowNull:false
        },
        seller_s_id:{ 
            type:DataTypes.INTEGER,
             allowNull:false
        },
        category_c_id:{ 
            type:DataTypes.INTEGER,
             allowNull:false
        },
        city_city_id:{ 
            type:DataTypes.INTEGER,
             allowNull:false
        },
        images:{ 
            type:DataTypes.STRING,
             allowNull:false
        },
        description:{ 
            type:DataTypes.TEXT,
             allowNull:false
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
    return Items
}