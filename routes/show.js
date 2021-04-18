const express = require("express");
const  router = express.Router();

const {
  createShow,
  getShow, 
  getShowById,
  deleteShow,
  updateShow,
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

  // router
  // .route("/:id/update1")
  // .put(protect,updateShow);

  router
  .route("/:id")
  .get(protect,getShowById)
  .delete(protect, deleteShow);

  router
  .route("/:id/update")
  .put(protect,updateShow);


  module.exports = router