const {verify} = require("jsonwebtoken");
const db = require('../models/index');
const Seller = db.seller

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, process.env.SECRET, async (err, decode) => {
                  if(err){
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    });
                  }else{
                    console.log(decode);
                    let seller = await Seller.findByPk(decode.id);
                    res.locals.seller = seller;
                    next();
                  }
            });

        }else{
            res.json({
                success:0,
                message:"Access denied! unauthorized seller"
            });
        }
    },


}