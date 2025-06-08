import { genAuthToken } from '../config/jwtAuth.js';
import User from '../models/userModels.js';
import bcrypt from 'bcrypt';


export const userLogin = async (req,res)=>{
    
    try{
        const {email, password} = req.body;

        if(!email || !password){
            console.log("fill the fields");
            res.send(json({"message" : "error"}));
            return next();
        }

        // console.log(email);
        // console.log(password);


        const user = await User.findOne({email});//find user 
        if(!user){
            console.log("User not Found");
            error.statusCode = 404;
            return next(error);
        }
        console.log(user);
        console.log(email);
        console.log(password)//1234567890

        const isVaildPassword = await bcrypt.compare(password, user.password);//compare password
        //console.log(isVaildPassword);//false why
        console.log(isVaildPassword);//false
        console.log(user.password);//1234567890
        
        if(!isVaildPassword){
             return res.status(400).json({ message: "Please fill all fields" }); 
        }
        



        genAuthToken(user._id, res);

        res.status(200).json(
            { message: "Login sucessfullay",
              user:{
                fullName: user.fullName,
                email: user.email,
                department: user.department,
                position: user.position,
                gender: user.gender,
                pic: user.pic,
                },
            },
        )

      //  localStorage.setItem("isLoggedIn", true);
    }
    catch (error) {
     res.status(500).json({ message: "Server error", error: error.message });
    } 

    
}


export const userRegister = async (req,res)=>{

    try{
        const {
            fullName,
            email,
            mobileNumber,
            gender,
            dob,
            password,
        } = req.body;


        if(
            !fullName||
            !email||
            !mobileNumber||
            !gender||
            !dob||
            !password

        ){
            // console.log("Fill the Fields");
            return res.status(400).json({ message: "All fields are required" });
            
        }


        // const newUser = await User.create({
        //     fullName,
        //     email,
        //     mobileNumber,
        //     gender,
        //     dob,
        //     qualification,
        //     department,
        //     position,
        //     hiringDate,
        //     salary,
        //     password,
        //     status : "Active",
        //     pic : "",


        // });

        // res.status(200).json({"message": "User created", newUser});



    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // const pic = `https://placehold.co/400X400?text=${fullName.charAt(
    //   0
    // )}`;

    const newUser = await User.create({
            fullName,
            email,
            mobileNumber,
            gender,
            dob,
            password:hashedPassword,
            status : "Active",
            pic : "",
    });

    res.status(201).json({
      message: "User Created Successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
    }catch(e){
        console.log(e);
    }

};