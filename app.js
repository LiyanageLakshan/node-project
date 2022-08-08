const path = require("path");
require("dotenv").config();
const express = require("express");
const app = express();



const staticPath = path.join(__dirname, "../Images");

// middleware

app.use(express.static(staticPath));

const sellerRouter = require("./api/seller/seller.router");
const categoryRouter = require("./api/category/category.router");
const cityRouter = require("./api/city/city.router");
const itemRouter = require("./api/item/item.router");



app.use(express.json());
app.use("/api/category", categoryRouter);

app.use("/api/city", cityRouter);

app.use("/api/seller", sellerRouter);

app.use("/api/item", itemRouter);

//statics images
app.use('/Images', express.static('./Images'))

app.listen(process.env.APP_PORT,()=>{
    console.log("Server running on port:", process.env.APP_PORT);
});