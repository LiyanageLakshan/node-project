const { addItem ,getAllItems, getOneItem , updateOneItem , deleteOneItem, upload,getItemBycategory,getItemBycity} = require("./item.controler");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.post("/", checkToken,upload,addItem);
router.get("/:id",  getOneItem);
router.get("/category/:category_c_id",  getItemBycategory);
router.get("/city/:city_city_id",  getItemBycity);
router.get("/", getAllItems);
router.patch("/:id", updateOneItem);
router.delete("/:id", deleteOneItem);

module.exports = router;