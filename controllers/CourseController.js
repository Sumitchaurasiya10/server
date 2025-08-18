const CourseModel = require("../models/course");
const cloudinary = require("cloudinary");

// configuration
cloudinary.config({
  cloud_name: "dkfqvl5jq",
  api_key: "152812747213967",
  api_secret: "Hos3WPeyPguTRl2qmWnx4qRpoFc", // Click 'View API Keys' above to copy your API secret
});
class CourseContoller {
  static display = async (req, res) => {
    // async -> promise-based function
    try {
      const data = await CourseModel.find();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  };

  static create = async (req, res) => {
    try {
      const { title, description, price, duration } = req.body;
      const file = req.files.image;
      //console.log(req.files)
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "Pninfosys_slider",
      });
      console.log(imageUpload);

      const data = await CourseModel.create({
        title,
        description,
        price,
        duration,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      })
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  };

  static view = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await CourseModel.findById(id);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  };

  static update = async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, price, duration } = req.body;
      const data = await CourseModel.findByIdAndUpdate(id, {
        title,
        description,
        price,
        duration,
      });
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  };

  static delete = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await CourseModel.findByIdAndDelete(id);
      res.json({
        msg: "Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = CourseContoller;
