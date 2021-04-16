const express = require("express");
const router = express.Router();

const {
    createService,
    getService,
    getServiceById,
    deleteService,
} = require("../controllers/service");

const { protect } = require("../middleware/auth");

router
.route("/")
.get(protect,getService)
.post(protect,createService);

router
.route("/:id")
.get(protect,getServiceById)
.delete(protect,deleteService);

module.exports = router