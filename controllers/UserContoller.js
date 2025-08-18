const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static register = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });
      res.json({
        data,
        msg: "user insert success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (req, res) => {
    try {
      //console.log(req.body)
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      // console.log(user)
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credential" });
      }

      // token create
      const token = jwt.sign({ ID: user._id }, "sumit1021");
      //console.log(token)

      // send token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
      });

      res.status(200).json({
        message: "Login Successful",
        role:user.role,
        name: user.name,
        email: user.email
      });


    
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  };

  static profile = async (req, rs) =>  {
    try {
        console.log("Hello profile")

    }catch (errpr){
        console.log(error)
    }
  };

  static logout = async (req,res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({message: "logout successfully"})

    } catch (error) {
        console.log(error);
    }
  };
}

module.exports = UserController;
