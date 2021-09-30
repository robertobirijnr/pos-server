const Item = require("../model/items");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../middleware/errorHandler");


exports.ItemById = (req, res, next, id) => {
  Item.findById(id)
    .populate("category")
    .exec((err, data) => {
      if (err || !data) {
        return res.statue(400).json({
          error: "Product not found",
        });
      }

      req.item = item;
      next();
    });
};

exports.getSingleItem = (req, res) => {
  req.item.photo = undefined;
  return res.json(req.item);
};

exports.createItem = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be upload",
      });
    }

    const { name, description, price, category, quantity } = fields;
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let item = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }

      item.photo.data = fs.readFileSync(files.photo.path);
      item.photo.contentType = files.photo.type;
    }

    item.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ result });
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let item = req.item;
    item = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 100000) {
        return res.status(400).json({
          error: "Image should be less than imb in size",
        });
      }

      item.photo.data = fs.readFileSync(files.photo.path);
      item.photo.contentType = files.photo.type;
    }

    item.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ result });
    });
  });
};

exports.deleteItem = (req, res) => {
  let item = req.item;
  item.remove((err, item) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({
      message: "Product deleted successfuly",
    });
  });
};

exports.getAllItems = (req, res) => {
  Item.find()
    .select("-photo")
    .populate("category")
    .exec((err, item) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      res.json(item);
    });
};
