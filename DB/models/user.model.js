import  { Schema,model ,mongoose} from "mongoose";

const userSchema = new Schema(
    {

        userName: {
            type: String,
            requiered: true,
            min: 3,
            max: 50,
        },
        email: {
            type: String,
            requiered: true,
            unique: true,
        },
        password: {
            type: String,
            requiered: true,
            min: 4,
        },
        image: {
            type: Object,
           
        },
        phone: {
            type: String,
        },
         adderess: {
            type: String,
        },
          confirmEmail: {
            type: Boolean,
            default:false,
        },
        sendCode: {
            type: String,
            default:null,
        },
         gender: {
            type: String,
            enum:['male','female'],
        },
        status:{
             type: String,
            enum:['active',' not_active'],
        },
       role:{
             type: String,
            enum:['admin',' user'],
        },
    },


   



    { timestamps: true, }



);




 const userModel = mongoose.models.User|| model('User',userSchema);
 export default userModel;