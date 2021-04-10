const express = require("express");
const  router = express.Router();

const {
  createShow,
  getShow, 
  getShowById,
  deleteShow,
  ShowPhotoUpload,
  } = require("../controllers/show");

  const { protect } = require("../middleware/auth");

  router
  .route("/")
  .get(protect,getShow)
  .post(protect,createShow);

  router
  .route("/:id/photo")
  .put(protect, ShowPhotoUpload);

  router
  .route("/:id")
  .get(protect,getShowById)
  .delete(protect, deleteShow);


  module.exports = router