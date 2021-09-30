const express = require("express")
const router = express.Router();
const Items = require("../controllers/items")
const { protect, isAuth } = require("../controllers/admin");



router.get("/items", Items.getAllItems)
router.post("/item/create",protect,isAuth, Items.createItem )
router.put("/item/:itemId",protect,isAuth, Items.update)
router.delete("/item/:itemId",protect,isAuth,Items.deleteItem)



router.param("itemId", Items.ItemById)
