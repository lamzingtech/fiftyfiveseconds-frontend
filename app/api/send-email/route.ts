// app/api/send-email/route.js



import { Resend } from 'resend';


export async function POST(req: any) {
  const resend = new Resend('re_SvqWaesP_HZV5uk48oMmWEabKYY5VQmk2');
  const { email, vlink } = await req.json();

  if (!email || !vlink) {
      return new Response(JSON.stringify({status: 2, message: 'Email and Video link are required' }), { status: 400 });
  }else{
    try {
      console.log("1111")
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'raikumar.khangembam@lamzing.com',
      subject: 'New Video link request',
      html: `You have a new message from (${email}):\n And the Video link \n${vlink}`
    });
    return new Response(JSON.stringify({ status: 1, message: 'Email sent successfully' }), { status: 200 });
    console.log("2222")
  } catch (error) {
    console.log("33333")
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({status: 2, message: 'Failed to send email' }), { status: 500 });
      }

  }
}

// import nodemailer from 'nodemailer';

// export async function POST(req: any) {
//   const { email, vlink } = await req.json();

//   if (!email || !vlink) {
//     return new Response(JSON.stringify({ message: 'Email and Video link are required' }), { status: 400 });
//   }



//   // Configure the transporter using Gmail SMTP (you can use other services)
//   const transporter = nodemailer.createTransport({
//     service: 'gmail', // You can use another email service provider
//     auth: {
//       user: "raikumar.khangembam@lamzing.com", // Your Gmail or email service user
//       pass: "", // Your email app password or password
//     },
//   });

//   const mailOptions = {
//     from: email, // Sender's email
//     to: "rico.panda2013@gmail.com", // Receiver's email
//     subject: 'New Video link request',
//     text: `You have a new message from (${email}):\n And the Video link \n${vlink}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return new Response(JSON.stringify({ message: 'Failed to send email' }), { status: 500 });
//   }
// }
