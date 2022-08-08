//const { seller } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Seller = sequelize.define("sellers",{

        s_id :{
             type:DataTypes.INTEGER,
             autoIncrement: true,
             primaryKey: true,
        },
         
        s_username:{ 
            type:DataTypes.STRING,
             allowNull:false,
        },
        email:{ 
            type:DataTypes.STRING,
             allowNull:false,
             validate: {
                isUnique: (value,next)=> {
                    Seller.findAll({
                        where: {email: value},
                        attributes:['s_id'],
                    })
                    .then((sellers) =>{
                        if(sellers.length !=0)
                        next(new Error('Email already in use!'));
                        next();
                    })
                    .catch((onError) => console.log(onError));
                }
             }
        },
        password:{ 
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
    });
    return Seller
}