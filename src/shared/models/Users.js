import mongoose from "mongoose"
import SecurityUtils from "../utils/Securitutils";
import bcrypt from "bcryptjs";

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
                if(this.isModified("password") && password && !password.startsWith("$2a$")){
                    const validations = SecurityUtils.validatePassword(password);
                    return validations.sucess

                };
                return true ; 


            },
            message:function (props){
                if(props.value && !props.value.startsWith("$2a$")){
                    const validations = SecurityUtils.validatePassword(props.value);
                    return validations.errors.join("- ");
                }
                return "Passwrod validations failed..."
            }
        }
    },
    role:{
        type:String,
        enum:['super_admin', 'client_admin', 'client_viewer'],
        default:"client_viewer",

    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:function(){
            return this.role !=="super_admin"
        }
    },
    isActive:{
        type:Boolean,
        default:true
    },
    permissions:{
        canCreateApiKeys: {
            type: Boolean,
            default: false,
        },
        canManageUsers: {
            type: Boolean,
            default: false,
        },
        canViewAnalytics: {
            type: Boolean,
            default: true,
        },
        canExportData: {
            type: Boolean,
            default: false,
        },

    }
},{timestamps:true,collation:"user"})


userSchema.pre("save",async function(next){
    if(!this.modefied("password")){
        return next();
    }
    try {

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next()
        

        
    } catch (error) {
        next(error)
        
    }

})

userSchema.index({clientId:1,isActive:1});
userSchema.index({role:1});

export const user = mongoose.model("user",userSchema);