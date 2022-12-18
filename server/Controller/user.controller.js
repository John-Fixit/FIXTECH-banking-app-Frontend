const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { userModel } = require("../Models/user.model");
const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
let currentMonth = new Date().getMonth();
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
                  message: `User registered successfully, your account Number has been sent to ${req.body.email}`,
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
          message: `The account number entered is incorrect!`,
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
              res.json({ token, status: true, user });
            } else {
              res.json({
                message: `Incorrect Verification Pin, please check your PIN and try again`,
                status: false,
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
  cloudinary.v2.uploader.upload(userDet.fileUrl, function (err, uploadResult) {
    if (err) {
      res.json({
        message: `Connection error! profile photo not saved, please try again!`,
        status: false,
      });
    } else {
      userModel.findOneAndUpdate(
        { _id: userDet.id },
        { profile_picture: uploadResult.secure_url },
        (err, result) => {
          if (err) {
            res.json({
              message: `Internal server error, profile picture not saved, please try again`,
              status: false,
            });
          } else {
            res.json({
              message: `Profile picture uploaded successfully`,
              status: true,
              pictureUrl: uploadResult.secure_url,
            });
          }
        }
      );
    }
  });
};
const getUserDetail = (req, res) => {
  const id = req.params.id;
  userModel.findById({ _id: id }, (err, user) => {
    if (err) {
      res.json({
        message: "Internal server error, please check your connection!",
        status: false,
      });
    } else {
      res.json({ userDetail: user, status: true });
    }
  });
};
const getAllUsers = (req, res) => {
  userModel.find((err, data) => {
    if (err) {
      res.json({
        message: "Internal server error, fetching allusers failed",
        status: false,
      });
    } else {
      res.json({ allUsers: data, status: true });
    }
  });
};

const transferFunc = (req, res) => {
  let reqBody = req.body;
  //finding sender code
  userModel.findById({ _id: reqBody.senderId }, (err, senderData) => {
    if (err) {
      res.json({
        message: `internal server error, please check your connection!`,
        status: false,
      });
    } else {
      senderData.totalBalance -= parseInt(reqBody.amount);
      senderData.transactionType.push(reqBody.senderTransactionDetail);
      senderData.monthlyTransaction.debit[currentMonth].amount += parseInt(
        reqBody.amount
      );
      //finding recipient code
      userModel.findById({ _id: reqBody.recipientId }, (err, recipientData) => {
        if (err) {
          res.json({
            message: `internal server error, please check your connection!`,
            status: false,
          });
        } else {
          recipientData.totalBalance += parseInt(reqBody.amount);
          recipientData.transactionType.push(
            reqBody.recipientTransactionDetail
          );
          recipientData.monthlyTransaction.credit[currentMonth].amount +=
            parseInt(reqBody.amount);
          //sender updating code
          // senderData.validatePassword({password: reqBody.password}, (err, same)=>{
          //       if(err){
          //         console.log(err)
          //       }
          //       else{
          //         if(same){
          //           console.log('correct pin')
          //         }
          //         else{
          //           console.log('ioncorrect pin')
          //         }
          //       }
          // })

          bcrypt.compare(reqBody.password, senderData.password, (err, same) => {
            if (err) {
              console.log(err);
            } else {
              if (same) {
                userModel.findOneAndUpdate(
                  { _id: reqBody.senderId },
                  {
                    $set: {
                      totalBalance: senderData.totalBalance,
                      transactionType: senderData.transactionType,
                      monthlyTransaction: senderData.monthlyTransaction,
                    },
                  },
                  (err, result) => {
                    //recipient updating code
                    userModel.findOneAndUpdate(
                      { _id: reqBody.recipientId },
                      {
                        $set: {
                          totalBalance: recipientData.totalBalance,
                          transactionType: recipientData.transactionType,
                          monthlyTransaction: recipientData.monthlyTransaction,
                        },
                      },
                      (err, result) => {
                        //execution result
                        if (err) {
                          res.json({
                            message: "Error occurred, connection time out!",
                            status: false,
                          });
                        } else {
                          res.json({
                            message: "Transfer done successfully",
                            status: true,
                          });
                        }
                      }
                    );
                  }
                );
              } else {
                res.json({
                  message: "The PIN entered is not correct",
                  status: false,
                });
              }
            }
          });
        }
      });
    }
  });
};

const topUpWithCard = (req, res) => {
  const reqBody = req.body;
  userModel.findById({ _id: reqBody.userId }, (err, user) => {
    if (err) {
      res.json({
        message: "Error occurred please check your internet connection!",
        status: false,
      });
    } else {
      user.totalBalance += parseInt(reqBody.amount);
      user.transactionType.push(reqBody.transactionDetail);
      user.monthlyTransaction.credit[currentMonth].amount += parseInt(
        reqBody.amount
      );
      userModel.findOneAndUpdate(
        { _id: reqBody.userId },
        {
          $set: {
            totalBalance: user.totalBalance,
            transactionType: user.transactionType,
            monthlyTransaction: user.monthlyTransaction,
          },
        },
        (err) => {
          if (err) {
            res.json({
              message: "error occurred, please check your connection!",
              status: false,
            });
          } else {
            res.json({
              message: `Your account has been funded successfully with ${reqBody.amount}`,
              status: true,
            });
          }
        }
      );
    }
  });
};
const checkUser = (req, res) => {
  const accountNumber = req.params.id;
  userModel.findOne({ accountNumber: accountNumber }, (err, result) => {
    if (err) {
      res.json({
        message: "Internal server error, please check your connection",
        status: false,
      });
    } else {
      if (result) {
        res.json({ user: result, status: true });
      } else {
        res.json({
          message: "The account Number entered is not correct",
          status: false,
        });
      }
    }
  });
};

const editProfile = async (req, res) => {
  const id = req.params.id;
  var message = "";
  var status = "";
  //edit name code
  if (req.body.type == "name") {
    userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { firstname: req.body.firstname, lastname: req.body.lastname } },
      (err, result) => {
        if (err) {
          message = "Error occurr, try again";
          status = false;
        } else {
          message = "Name updated successfully";
          status = true;
        }
        res.json({ message, status });
      }
    );
  }
  //edit email code
  else if (req.body.type == "email") {
    userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { email: req.body.email } },
      (err, result) => {
        if (err) {
          message = "Error occurr, try again";
          status = false;
        } else {
          message = "Email updated successfully";
          status = true;
        }
        res.json({ message, status });
      }
    );
  }

  //edit phone Number code
  else if (req.body.type == "phoneNumber") {
    userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { phoneNumber: req.body.phoneNumber } },
      (err, result) => {
        if (err) {
          message = "Error occurr, try again";
          status = false;
        } else {
          message = "Phone Number updated successfully";
          status = true;
        }
        res.json({ message, status });
      }
    );
  }
  //edit Address code
  else if (req.body.type == "address") {
    userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { address: req.body.address } },
      (err, result) => {
        if (err) {
          message = "Error occurr, try again";
          status = false;
        } else {
          message = "Address updated successfully";
          status = true;
        }
        res.json({ message, status });
      }
    );
  }
};
const getMonthlyTransactionStat = (req, res) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((data) => {
      res.json({
        creditData: data.monthlyTransaction.credit,
        debitData: data.monthlyTransaction.debit,
        status: true,
      });
    })
    .catch((err) => {
      res.json({
        message: "Internal server error, please check your connection",
        status: false,
      });
    });
};
module.exports = {
  getRes,
  signup,
  signin,
  authorizeFunc,
  uploadUserPicture,
  getUserDetail,
  getAllUsers,
  transferFunc,
  topUpWithCard,
  checkUser,
  editProfile,
  getMonthlyTransactionStat,
};
