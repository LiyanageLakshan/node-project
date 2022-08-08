const db = require('../../models/index');
//const {genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { items } = require('../../models/index');
//const express = require('express');
//const Seller = db.seller
const Category = db.category
//const City = db.city
//const Items = db.items

// add category

const addCategory = async (req,res) => {
    if(!req.body.c_name){
        res.status(400).send({
            message: 'Please Insert category',
        });
        return
    }
   
    let info = {
        c_name: req.body.c_name,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    };
  try {
    const category = await Category.create(info);
    res.status(200).send(category);
    console.log(category);
  }catch(err){
    res.status(500).send({
        message: err.message || 'Error occured'
     })

  }
}

// get all category

const getAllCategory = async (req, res) => {
    let category = await Category.findAll({})
    res.status(200).send(category)
}

// get id by category

const getOneCategory = async (req, res) => {
    let id = req.params.category_c_id
    let category = await Category.findOne({where: {category_c_id: id}})
    res.status(200).send(category)
}
//update category

const updateOneCategory = async (req, res) => {
    let id = req.params.category_c_id
    let category = await Category.update({where: {category_c_id: id}})
    res.status(200).send(category)
}

// delete category
const deleteOneCategory = async (req, res) => {
    let id = req.params.category_c_id
     await Category.destroy({where: {category_c_id: id}})
    res.status(200).send('category is deleted')
}


// get category wise items

const getCategoryItems = async (req, res) => {
    let id = req.params.category_c_id
  
    try {
        const data = await Category.findAll({
            include: [{
                model: items,
            }],
            where: {category_c_id: id}
        });
        res.status(200).send(data);
        console.log(data);
      }catch(err){
        res.status(500).send({
            message: err.message || 'Error occured'
         })
    
      }
}



module.exports = { 
    addCategory,
    getAllCategory,
    getOneCategory,
    updateOneCategory,
    deleteOneCategory,
    getCategoryItems
    
}

