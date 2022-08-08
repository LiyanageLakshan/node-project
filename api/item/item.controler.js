const db = require('../../models/index');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');

//const express = require('express');
const Seller = db.seller
const Category = db.category
const City = db.city
const Items = db.items



// add item

const addItem = async  (req,res) => {
     if(!req.body.i_name){
        res.status(400).send({
            message: 'Please Insert Item',
        });
        return
    }
    if(!req.body.category_c_id){
        res.status(400).json({ error: "Insert Category"});
     }
     
     if(!req.body.city_city_id){
        res.status(400).json({ error: "Insert City"});
     }

        let category = await Category.findOne({where: {category_c_id: req.body.category_c_id}});
        let city = await City.findOne({where: {id: req.body.city_city_id}});

   if(!category){
      res.status(400).json({ error: "Invalid Category"});
   }
   
        if(!city){
         res.status(400).json({ error: "Invalid City"});
        }
    
    let info = {
        i_name: req.body.i_name,
        i_price: req.body.i_price,
        i_topic: req.body.i_topic,
        con_number: req.body.con_number,
        seller_s_id: res.locals.seller.s_id,
        category_c_id: req.body.category_c_id,
        city_city_id: req.body.city_city_id,
        images: req.file.path,
        description: req.body.description,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    };
  try {
    const items = await Items.create(info);
    res.status(200).send(items);
    console.log(items);
  }catch(err){
    res.status(500).send({
        message: err.message || 'Error occured'
     })

  }

}

// get all items

const getAllItems = async (req, res) => {

    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
    }

    let size = 3;
    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 3 ) {
        size = sizeAsNumber;
    }
    
    let items = await Items.findAndCountAll({
        limit: size,
        offset: page * size
    });

    res.status(200).send({
        content: items,
        totalPages: Math.ceil(items.count / size)
    });
}

// get id by item

const getOneItem = async (req,res) => {
    let id = req.params.id
   
    try {
        const items = await Items.findOne({where:{id: id}});
        res.status(200).send(items);
        console.log(items);
      }catch(err){
        res.status(500).send({
            message: err.message || 'Error occured'
         })
    
      }
}
//get items by city
const getItemBycity = async (req, res) => {
    let city_city_id = req.params.city_city_id
    let items = await Items.findAll({where: {city_city_id: city_city_id}})
    res.status(200).send(items)
}

//get items by city
const getItemBycategory = async (req, res) => {
    let category_c_id = req.params.category_c_id
    let items = await Items.findAll({where: {category_c_id: category_c_id}})
    res.status(200).send(items)
}

//update item

const updateOneItem = async (req, res) => {
    let id = req.params.id
    let items = await Items.update({where: {id: id}})
    res.status(200).send(items)
}

// delete item
const deleteOneItem = async (req, res) => {
    let id = req.params.id
     await Items.destroy({where: {id: id}})
    res.status(200).send('item is deleted')
}


// upload image controler

const storage = multer.diskStorage({
    destination: (req, file , cb) => {
            cb(null,'Images')
    },
    filename:(req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits:{ fileSize: '2000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
             return cb(null, true)
        }
           cb('Give proper files format to upload')
    }

}).single('images');

//.array('images',3)



module.exports = { 
    addItem,
    getAllItems,
    getOneItem,
    updateOneItem,
    deleteOneItem,
    upload,
    getItemBycity,
    getItemBycategory
    
}

