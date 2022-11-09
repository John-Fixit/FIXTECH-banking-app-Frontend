const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { userModel } = require("../Models/user.model");
const cloudinary = require('cloudinary')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const SECRET = process.env.JWT_SECRET
const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD
const getRes = (req, res) => {
  return res.json({ message: `IT'S RESPONDING` });
};

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

const transporter = nodemailer.createTransport({
  service: 'smtp@gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
})
const signup = (req, res) => {
  console.log(req.body);
  userModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.json({
        message: `Internal sever error! please check your connection`,
        status: false,
      });
    } else {
      if (user) {
        res.json({
          message: `The Email entered has already been used`,
          status: false,
        });
      } else {
        const form = new userModel(req.body);
        form.save((err) => {
          if (err) {
            res.json({
              message: `Network error, please try again!`,
              status: false,
            });
          } else {
            const mailMessage = {
              from: "FIXTECH",
              to: req.body.email,
              subject: 'Registration successfull',
              html: `<b class='card-title'>Dear ${req.body.firstname} ${req.body.lastname},</b>
                            <p >Welcome to FIXTECH app!</p>
                            <p >Congratulations! youraccount has been successfully created.</p>
                            <p >Your account number is ${accountNumber}. FIXTECH app it's a simple, fast and secure banking app.</p>
                            <p>click on this <a href='https://google.com'>link</a> to sign in to your account
                            Thank you!`
            }
            transporter.sendMail(mailMessage, (err, result)=>{
              if(err){
                console.log(err);
              }
              else{
                console.log(result);
              }
            })
            res.json({ message: `User registered successfully, navigate to your gmail account for your account number!`, status: true });
          }
        });
      }
    }
  });
};
const signin = (req, res) => {
  console.log(req.body);
    const password = req.body.password
    userModel.findOne({accountNumber: req.body.accountNumber}, (err, user)=>{
        if(err){
            res.json({message: `Internal server error, please check your connection!`, status: false})
            console.log(`internal server error`);
        }else{
            if(!user){
                res.json({message: `The account number was incorrect!`, status: false})
            }else{
                user.validatePassword(password, (err, same)=>{
                    if(err){
                        res.json({message: `Internal server error, please check your connection and try again.`, status: false})
                    }else{
                        if(same){
                            const token = jwt.sign({accountNumber: req.body.accountNumber}, SECRET)
                            res.json({token, status: true})
                        }else{
                            res.json({message: `Incorrect password, please check your password and try again`})
                        }
                    }
                })
            }
        }
    })

};
// const googleCallback = (req, res) => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         CLIENT_URL: process.env.CLIENT_URL,
//         scope: ["profile", "email"],
//       },
//       function (accessToken, refreshToken, profile, callback) {
//         callback(null, profile);
//       }
//     )
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });

//   passport.deserializeUser((user, done) => {
//     done(null, user);
//   });

//   passport.authenticate("google", {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: res.send({ status: false, message: `Not authenticated` }),
//   });
// };

const authorizeFunc=(req, res)=>{
  // console.log(req);
  const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, SECRET, (err, result)=>{
      if(err){
        console.log(err);
        res.json({message: `Internal server error! please check your connection`, status: false})
      }else{
        userModel.findOne({'accountNumber': result.accountNumber}, (err, user)=>{
          if(err){
            res.send({message: `Internal server error!`, status: false})
          }else{
            res.send({userDetail: user, status: true})  
          }
        })
      }
    })
}
const uploadUserPicture=(req, res)=>{
  const userDet = req.body
  cloudinary.v2.uploader.upload(userDet.fileUrl, function(err, result){
    const pictureUrl = result.secure_url;
    if(err){
      res.json({message: `Internal service error! profile photo not saved, please try again!`, status: false})
    }else{
        userModel.findOneAndUpdate({'_id': userDet.id}, {'profile_picture': result.secure_url}, (err, result)=>{
            if(err){
              res.json({message:`Internal server error, profile picture not saved, please try again`, status: false})
            }
            else{
                res.json({message: `Profile picture uploaded successfully`, status: true, pictureUrl})
            }
        })
    }
  })
 
}

module.exports = {
  getRes,
  signup,
  signin,
  // googleCallback,
  authorizeFunc,
  uploadUserPicture
};
