const { addCategory ,getAllCategory, getOneCategory , updateOneCategory , deleteOneCategory, getCategoryItems} = require("./category.controler");
const router = require("express").Router();
//const { checkToken } = require("../../auth/token_validation")


router.post("/",addCategory);
router.get("/:category_c_id",  getOneCategory);
router.get("/categoryitems/:category_c_id", getCategoryItems);
router.get("/", getAllCategory);
router.patch("/:category_c_id", updateOneCategory);
router.delete("/:category_c_id", deleteOneCategory);

module.exports = router;