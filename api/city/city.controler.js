const db = require('../../models/index');
//const {genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { items } = require('../../models/index');
//const express = require('express');
//const Seller = db.seller
//const Category = db.category
const City = db.city
//const Items = db.items

// add city

const addCity = async (req,res) => {
    if(!req.body.city){
        res.status(400).send({
            message: 'Please Insert city',
        });
        return
    }
   
    let info = {
        city: req.body.city,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    };
  try {
    const city = await City.create(info);
    res.status(200).send(city);
    console.log(city);
  }catch(err){
    res.status(500).send({
        message: err.message || 'Error occured'
     })

  }
}

// get all city

const getAllCity = async (req, res) => {
    let city = await City.findAll({})
    res.status(200).send(city)
}

// get id by category

const getOneCity = async (req, res) => {
    let id = req.params.id
    let city = await City.findOne({where: {id: id}})
    res.status(200).send(city)
}
//update city

const updateOneCity = async (req, res) => {
    let id = req.params.id
    let city = await City.update({where: {id: id}})
    res.status(200).send(city)
}

// delete city
const deleteOneCity = async (req, res) => {
    let id = req.params.id
     await City.destroy({where: {id: id}})
    res.status(200).send('city is deleted')
}

// get cities items

const getCityItems = async (req, res) => {
    let id = req.params.id
  
    try {
        const data = await City.findAll({
            include: [{
                model: items,
            }],
            where: {id: id}
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
    addCity,
    getAllCity,
    getOneCity,
    updateOneCity,
    deleteOneCity,
    getCityItems
    
}

