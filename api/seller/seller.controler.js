const db = require('../../models/index');
const {genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { items } = require('../../models/index');
//const express = require('express');
const Seller = db.seller
//const Category = db.category
//const City = db.city
//const Items = db.items


const addSeller = async (req,res) => {
    if(!req.body.email){
        res.status(400).send({
            message: 'Please Insert email',
        });
        return
    }
    const salt = genSaltSync(10);
    let info = {
        s_username: req.body.s_username,
        email: req.body.email,
        password: hashSync(req.body.password,salt), 
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    };
  try {
    const seller = await Seller.create(info);
    //res.status(200).send(seller);
    res.status(400).json({message: "Data added successfuly"});
    console.log(seller);
  }catch(err){
    res.status(500).send({
        message: err.message || 'Error occured'
     })

  }
}

// get all sellers

const getAllSellers = async (req, res) => {
    let seller = await Seller.findAll({})
    res.status(200).send(seller)
}

// get id by  sellers

const getOneSellers = async (req, res) => {
    let id = req.params.s_id
    let seller = await Seller.findOne({where: {s_id: id}})
    res.status(200).send(seller)
}

// get seller's items

const getSellersItems = async (req, res) => {
    let id = req.params.s_id
  
    try {
        const data = await Seller.findAll({
            include: [{
                model: items,
            }],
            where: {s_id: id}
        });
        res.status(200).send(data);
        console.log(data);
      }catch(err){
        res.status(500).send({
            message: err.message || 'Error occured'
         })
    
      }
}


//login


const login = async (req, res) => {
    let seller = await Seller.findOne({where: {email: req.body.email}});
    if(seller){
        const password_valid = await compareSync(req.body.password,seller.password); 
        if(password_valid){
            token = jwt.sign({"s_id" : seller.s_id, "email" : seller.email, "s_username" : seller.s_username},process.env.SECRET);
           
            res.status(200).json({ token : token, message: "Login successfuly"});
        }else {
            res.status(400).json({ error: "Password Incorrect"});
        }
    }else{
        res.status(404).json({error: "User does not exist"});
    }
   

}   




module.exports = { 
    addSeller,
    getAllSellers,
    getOneSellers,   
    login,
    getSellersItems
}



