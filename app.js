const express = require("express")
const app = express()
const port = 3000
const web = require("./routes/web")
const connectDB = require("./db/connectDB")
const fileupload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const cors = require("cors")

require("dotenv").config();

app.use(
    cors({
        //origin:"http://localhost:5173", // your frontend url  and last me / remove
        origin:"https://coursebookings.netlify.app",
        credentials: true,
    })
);



// token get coolie
app.use(cookieParser())

app.use(fileupload({
    useTempFiles: true
}))
connectDB()
app.use(express.json())


app.use('/api',web) // localhost:3000/api/
app.listen(process.env.PORT,console.log('server start localhost:3000'))