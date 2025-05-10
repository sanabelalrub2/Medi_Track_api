import nodemailer from "nodemailer";



 

export async function sendEmail(to, subject, html) {

    const transporter = nodemailer.createTransport({

        service: "gmail",

        auth: {

            user:  'sanabelalrub@gmail.com',



            pass: "kitw uiyp hsuv ehtx",



        },



    });




    const info = await transporter.sendMail({

        from: ' "MediTrack" <${process.env.SENDER_EMAIL}>',

        to, // List of receivers

        subject, // Subject Line

        html,
    });


}