const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phoneNumber: String,
    email: String,
    accountNumber: Number,
    totalBalance: Number,
    profile_picture: String,
    password: String,
    transactionType: [
        credit= [],
        debit = []
    ],
})

let saltRound = 10
let accountNumber = Math.floor("2"+(100000000 + Math.random() * 900000000))
userSchema.pre("save", function(next){
    bcrypt.hash(this.password, saltRound, (err, hashedPassowrd)=>{
        if(err){
            console.log(err);
        }else{
             this.password = hashedPassowrd
             this.accountNumber = accountNumber
             next()
        }
    } )
})


userSchema.methods.validatePassword = function (password, callback){
    bcrypt.compare(password, this.password, (err, same)=>{
        if(!err){
            callback(err, same)
        }else{
            next()
        }
    })
}


const userModel = mongoose.model('users_tb', userSchema)

module.exports = {userModel}