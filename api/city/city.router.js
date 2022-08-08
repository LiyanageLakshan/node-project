const { addCity ,getAllCity, getOneCity , updateOneCity , deleteOneCity, getCityItems} = require("./city.controler");
const router = require("express").Router();
//const { checkToken } = require("../../auth/token_validation")


router.post("/",addCity);
router.get("/:id",  getOneCity);
router.get("/cityitem/:id",  getCityItems);
router.get("/", getAllCity);
router.patch("/:id", updateOneCity);
router.delete("/:id", deleteOneCity);

module.exports = router;