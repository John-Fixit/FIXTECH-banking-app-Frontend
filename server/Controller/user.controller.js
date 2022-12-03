const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { userModel } = require("../Models/user.model");
const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token in Account Info and set the environment variables.
// See http://twil.io/secure
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);


const SECRET = process.env.JWT_SECRET;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const getRes = (req, res) => {
  return res.json({ message: "It's resonding", status: true });
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const transporter = nodemailer.createTransport({
  service: "smtp@gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});
const signup = (req, res) => {
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

            // client.messages
            // .create({ body: `Your FICOM account Number is ${req.body.accountNumber}`, from: process.env.PHONE_NUMBER, to: "+2349160261836" })
            // .then((message) => console.log(message.body));
            const mailMessage = {
              from: "FIXTECH",
              to: req.body.email,
              subject: "Registration successfull",
              html: `<b class='card-title'>Dear ${req.body.firstname} ${req.body.lastname},</b>
                            <p >Welcome to FIXTECH app!</p>
                            <p >Congratulations! your account has been successfully created.</p>
                            <p >Your account number is ${req.body.accountNumber}. FIXTECH, it's a simple, fast and secure bank app.</p>
                            <p>click on this <a href='https://google.com'>LINK</a> to sign in to your account.
                            Thank you!`,
            };
            transporter.sendMail(mailMessage, (err, result) => {
              if (err) {
                res.json({
                  message:
                    "Registration not complete please check your connection",
                  status: false,
                });
              } else {
                res.json({
                  message: `User registered successfully, navigate to your gmail account for your account number!`,
                  status: true,
                });
              }
            });
          }
        });
      }
    }
  });
};
const signin = (req, res) => {
  const password = req.body.password;
  userModel.findOne({ accountNumber: req.body.accountNumber }, (err, user) => {
    if (err) {
      res.json({
        message: `Internal server error, please check your connection!`,
        status: false,
      });
      console.log(`internal server error`);
    } else {
      if (!user) {
        res.json({
          message: `The account number was incorrect!`,
          status: false,
        });
      } else {
        user.validatePassword(password, (err, same) => {
          if (err) {
            res.json({
              message: `Internal server error, please check your connection and try again.`,
              status: false,
            });
          } else {
            if (same) {
              const token = jwt.sign(
                { accountNumber: req.body.accountNumber },
                SECRET
              );
              res.json({ token, status: true });
            } else {
              res.json({
                message: `Incorrect password, please check your password and try again`,
              });
            }
          }
        });
      }
    }
  });
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

const authorizeFunc = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, SECRET, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        message: `Internal server error! please check your connection`,
        status: false,
      });
    } else {
      userModel.findOne(
        { accountNumber: result.accountNumber },
        (err, user) => {
          if (err) {
            res.send({ message: `Internal server error!`, status: false });
          } else {
            res.send({ userDetail: user, status: true });
          }
        }
      );
    }
  });
};
const uploadUserPicture = (req, res) => {
  const userDet = req.body;
  cloudinary.v2.uploader.upload(userDet.fileUrl, function (err, result) {
    const pictureUrl = result.secure_url;
    if (err) {
      res.json({
        message: `Internal service error! profile photo not saved, please try again!`,
        status: false,
      });
    } else {
      userModel.findOneAndUpdate(
        { _id: userDet.id },
        { profile_picture: result.secure_url },
        (err, result) => {
          console.log(result);
          if (err) {
            res.json({
              message: `Internal server error, profile picture not saved, please try again`,
              status: false,
            });
          } else {
            res.json({
              message: `Profile picture uploaded successfully`,
              status: true,
              pictureUrl,
            }); 
            // 07026329525
          }
        }
      );
    }
  });
};
const getUserDetail = (req, res) => {
  const id = req.params.id
  userModel.findById({_id: id}, (err, user)=>{
    if(err){
      res.json({message: "Internal server error, please check your connection!", status: false})
    }
    else{
      res.json({userDetail: user, status: true})
    }
  })
};
const getAllUsers=(req, res)=>{
    userModel.find((err, data)=>{
        if(err){
          res.json({message: "Internal server error, fetching allusers failed", status: false})
        }
        else{
          res.json({allUsers: data, status: true});
        }
    })
}

const transferFunc=(req, res)=>{
    let reqBody = req.body
    userModel.findById({_id: reqBody.senderId}, (err, senderData)=>{
        if(err){
          res.json({message: `internal server error, please check your connection!`, status: false})
        }
        else{
            senderData.totalBalance -= parseInt(reqBody.amount)
            senderData.transactionType.push(reqBody.senderTransactionDetail)

            userModel.findById({_id: reqBody.recipientId}, (err, recipientData)=>{
              if(err){
                res.json({message: `internal server error, please check your connection!`, status: false})
              }
              else{
                recipientData.totalBalance += parseInt(reqBody.amount)
                recipientData.transactionType.push(reqBody.recipientTransactionDetail)
                
                //sender execution code
                userModel.findOneAndUpdate({'_id': reqBody.senderId}, { $set: {'totalBalance': senderData.totalBalance, transactionType: senderData.transactionType}}, (err, result)=>{
                     //recipient execution code
                userModel.findOneAndUpdate({'_id': reqBody.recipientId}, { $set: {'totalBalance': recipientData.totalBalance, transactionType: recipientData.transactionType}}, (err, result)=>{
                  //execution result
                  if(err){
                      res.json({message: 'Error occurred, connection time out!', status: false})
                  }
                  else{
                    res.json({message: 'Transfer done successfully', status: true})
                  }
                })

                })

              }
            })
        }
    })
    
}
module.exports = {
  getRes, 
  signup,
  signin,
  authorizeFunc,
  uploadUserPicture,
  getUserDetail,
  getAllUsers,
  transferFunc
};


