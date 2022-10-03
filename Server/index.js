const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const port = 8000;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE,PUT");
  next();
});

mongoose.connect("mongodb://localhost:27017/loginSystem"); //Connecting with mongoose

const userSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("user", userSchema);



app.get("/", (req, res) => {
  res.send("THE SERVER IS UP");
});

app.get("/api/data", async (req, res) => {
  const data = await userModel.find();
  res.send({ data, length: data.length });
});

app.post("/signup", (req, res) => {
  console.log("FETCHED DATA IS:", req.body)
  const newUser = new userModel(req.body);
  newUser.save();
  res.send(newUser);
});


//NODEMAILLER

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'simarsing007@gmail.com',
    pass: 'Tanmay@4600',
    clientId: '328845036378-nf0gvfip90riurcurv4hvs2sp6o8tbev.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//04_gytx8DgQ90CgYIARAAGAQSNwF-L9Irq613iFp-uL-uvlksNHIZGAGAkg1ReVmkOpLGBYLEzyL7Ol-QD1S0WT_K1SJyQDpPzyE',
  }
});

const sendMail = (id,email) => {

  let mailOptions = {
    from: 'simarsing007@gmail',
    to: email,
    subject: 'Password Reset',
    text:"http://localhost:3000/PasswordReset/"+id
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });


}

app.post("/requestReset", (req, res) => {
  console.log("FETCHED DATA IS:", req.body)
  sendMail(req.body._id,req.body.email)

  console.log("http://localhost:3000/PasswordReset/"+req.body._id)
});



// Update Password
app.put('/passwordResetRequest/:id',async (req,res)=>{
  let dataToUpdate = req.body;
  console.log(dataToUpdate);
  const data = await userModel.findByIdAndUpdate(req.params.id, dataToUpdate);
  res.send({ data });
})

app.delete('/api/data/delete/:id', async(req,res) => {
  const data = await userModel.findByIdAndDelete(req.params.id);
  res.send({data});
})



// 1. Post request for signup page
// 2. Get request for login page
// 3. Post request for RequestReset
// 4 Update request for ResetPasword
// 5 Password encryption

app.listen(port, () => {
  console.log("http://localhost:", port);
});
