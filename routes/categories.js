const expres = require("express");
const { userById, protect, isAuth } = require("../controllers/admin");
const {
  categoryById,
  getCategory,
  getAllCategories,
  createCategory,
  updateCateory,
  deleteCategory,
} = require("../controllers/categories");
const router = expres.Router();

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

router.post("/category/create/:userId", protect, isAuth, createCategory);
router.put("/category/:categoryId/:userId", protect, isAuth, updateCateory);
router.delete("/category/:categoryId/:userId", deleteCategory);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
