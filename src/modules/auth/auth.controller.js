import userModel from "../../../DB/models/user.model.js";
import { sendEmail } from "../../utils/sendEmail.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { customAlphabet } from 'nanoid';
export const register = async (req, res, next) => {

    const { userName, email, password } = req.body;

    const user = await userModel.findOne({ email });

    const token = jwt.sign({ email }, process.env.CONFIRMEMAILSIGNAL);
    if (user) {

        return res.status(404).json({ message: "Email already registered" });

    }

    const hashedpassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));

    const html = `<div>
  <h1>Welcome ${userName}</h1>
  <a href="http://localhost:7000/auth/confirmemail/${token}">Confirm Email</a>
</div>`;






    await sendEmail(email, "confirm email", html);
    const createdUser = await userModel.create({ userName, email, password: hashedpassword });
    return res.status(200).json({ message: "success", user: createdUser });

}
/*
export const confirmEmail = () => {
    const { email } = req.params;
    const { token } = req.params;
    const decode = jwt.verify(token, process.env.CONFIRMEMAILSIGNAL);

    return res.json(decode);

    userModel.findOneAndUpdate({ email: decode.email }, { confirmEmail: true });
    return res.status(200).json({ message: "success", user: createdUser });
}
*/
export const confirmEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const decode = jwt.verify(token, process.env.CONFIRMEMAILSIGNAL);
        const user = await userModel.findOneAndUpdate(
            { email: decode.email },
            { confirmEmail: true },
            { new: true }
        );

        return res.status(200).json({ message: "Email confirmed", user });
    } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
}




export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {

        return res.status(400).json({ message: "Invalid Data" });

    }

    if (!user.confirmEmail) {
        return res.status(400).json({ message: " confirm Your Email" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ message: " Invalid Data" });
    }




    const token = jwt.sign({ id: user._id, userName: user.userName, role: user.role }, process.env.LOGIN_SIGNAL);

    return res.status(200).json({ message: "Login successful", token });

}






export const sendCode = async (req, res) => {

    const { email, password } = req.body;
    const code = customAlphabet('1234567890abcdefABCDEF', 4);
    return res.json({ code: code() });
    const user = await userModel.findOneAndUpdate({ email }, { sendCode: code });
    const htm = `
    
    <h2>code is ${code}</h2>
    
    `;
    await sendEmail(email, "Rest Password", html);

    return res.status(200).json({ message: " success" });

}




export const resetPassword = async (req, res) => {

    const {code,email, password} = req.body;

    const user = await userModel.findOne({ email });


    if (!user) {



        return res.status(400).json({ message: "not register account" });
    }
    if (user.sendCode != code) {



        return res.status(400).json({ message: "invalid code" });

    }

    const hashedPassword = bcrypt.hash(password, parseInt(process.env.SALT_ROUND));

    return res.json(user);

}