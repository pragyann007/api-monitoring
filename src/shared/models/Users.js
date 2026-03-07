import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        validate:{
            validator:function(username){
                return /^[a-zA-Z0-9_.-]+$/.test(userName);
            },
            message: "Please enter a valid username"
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(email){
                 return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message:"Please enter valid email "
        }
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:function(password){
                

            }
        }
    }
})