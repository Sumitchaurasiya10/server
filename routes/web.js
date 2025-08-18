const express = require("express");
const ContactController = require("../controllers/ContactController");
const TeacherController = require("../controllers/TeacherController");
const CourseController = require("../controllers/CourseController");
const UserController = require("../controllers/UserContoller");
const BookingController = require("../controllers/BookingController");
const checkAuth = require("../middleware/auth");
const router = express.Router();

router.get("/contact", ContactController.display);
router.post("/create", ContactController.create);
router.get("/view/:id", ContactController.view);
router.put("/update/:id", ContactController.update);
router.delete("/delete/:id", ContactController.delete);

// teacher

router.get("/teacher", TeacherController.display);
router.post("/teachercreate", TeacherController.create);
router.get("/teacherview/:id", TeacherController.view);
router.put("/teacherupdate/:id", TeacherController.update);

// course

router.get("/course", CourseController.display);
router.post("/coursecreate", CourseController.create);
router.get("/courseview/:id", CourseController.view);
router.put("/courseupdate/:id", CourseController.update);
router.delete("/coursedelete/:id", CourseController.delete);

//user
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/profile", checkAuth, UserController.profile);
router.get("/logout", UserController.logout);

//booking

router.post(
  "/booking/create/:courseId",
  checkAuth,
  BookingController.createbooking
);
router.get("/booking/mybookings", checkAuth, BookingController.getUserBookings);
router.get("/admin/bookings", checkAuth, BookingController.getAllBooking);

module.exports = router;
