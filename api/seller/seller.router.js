const { addSeller ,getAllSellers, getOneSellers , login , getSellersItems} = require("./seller.controler");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")


router.post("/",addSeller);
router.get("/:s_id", checkToken, getOneSellers);
router.get("/", checkToken, getAllSellers);
router.get("/selleritems/:s_id", checkToken, getSellersItems);
router.post("/login",login);

module.exports = router;