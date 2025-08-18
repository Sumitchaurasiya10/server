const Booking = require("../models/booking");
const Course = require("../models/course");

class BookingController {
  static createbooking = async (req, res) => {
    try {
      const { courseId } = req.params;
      const userId = req.user._id; // assuming JWT middleware sets req.user
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({ message: "course not found" });
      }

      const newBooking = await Booking.create({
        course: course._id,
        user: userId,
        price: course.price,
      });

      return res.status(201).json({
        message: "Booking created successfully",
        booking: newBooking,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  // static arrow function to get user bookings
  static getUserBookings = async (req, res) => {
    try {
      const userId = req.user._id;
      const booking = await Booking
        .find({ user: userId })
        .populate("course", "title price")
        .sort({ createdAt: -1 });

      return res.status(200).json({ booking });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "server error" });
    }
  };

  //static arrow function to cancle booking

  static cancelBooking = async (req, res) => {
    try {
      const { bookingId } = req.params;
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { status: "Cancelled" },
        { new: true }
      );

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      return res.status(200).json({
        messsage: "Booking cancelled successfully",
        booking,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "server error" });
    }
  };

  static getAllBooking = async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("user", "name email")
        .populate("course", "title price")
        .sort({ createdAt: -1 });

      // Format response

      const formatted = bookings.map((b) => ({
        _id: b._id,
        userName: b.user.name,
        userEmail: b.user.email,
        courseTitle: b.course.title,
        price: b.course.price,
        status: b.status,
        createdAt: b.createdAt,
      }));
      res.status(200).json(formatted);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "server error" });
    }
  };
}

module.exports = BookingController;
