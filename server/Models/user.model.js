const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
let  month = [{name: 'Jan', amount: 0},{name: 'Feb', amount: 0},{name: 'Mar', amount: 0},{name: 'Apr', amount: 0},{name: 'May', amount: 0},{name: 'Jun', amount: 0},{name: 'Jul', amount: 0},{name: 'Aug', amount: 0},{name: 'Sep', amount: 0},{name: 'Oct', amount: 0},{name: 'Nov', amount: 0},{name: 'Dec', amount: 0}, ]
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phoneNumber: String,
    email: String,
    accountNumber: String,
    totalBalance: Number,
    profile_picture: String,
    password: String,
    address: String,
    transactionType: [],
    monthlyTransaction: {   
        type: Object,
        default: {
            credit: month,
            debit: month
        }
    }
    
})


let saltRound = 10
userSchema.pre("save", function(next){
    bcrypt.hash(this.password, saltRound, (err, hashedPassowrd)=>{
        if(err){
            console.log(err);
        }else{
             this.password = hashedPassowrd
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