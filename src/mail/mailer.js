const nodemailer = require("nodemailer");
require('dotenv').config();
// async..await is not allowed in global scope, must use a wrapper
async function sendmailStudent(to,obj) {
 

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.mailID, // user
      pass: process.env.mailPassword // password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.mailID, // sender address
    to: to, // list of receivers
    subject: 'The Study Plus Provide Best Teacher From all Over Worlds!', // Subject line
    text: "",
    html: `<h1 style="color: #05BAF9;">Thank You For Choosing The Study Plus.</h1>
    <h3 style="color: #0535F9;">Teacher Details.</h3> <h4>Name: ${obj.name}</h4>
    <p>Email Id: ${obj.email}</p><p>Phone Number: ${obj.phone}</p>
    <p>Qualification: ${obj.qualification}</p><br>
    <p>Keep patience teacher are connecting with you.</p><br>
    <p>Thank You.</p><br>
    <p>The Study Plus Provides best and verified teacher from NITs and IITs. All teachers are most experience in our field. You can find the teachers for single topic or single question.
     The teacher solves the doubt within a minuts and give you best learning experience.</p>`,
     // html body
  });

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// sendmailStudent().catch(console.error);
// async..await is not allowed in global scope, must use a wrapper
async function sentmailTeacher(to,obj) {
 

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.mailID, // user
      pass: process.env.mailPassword // password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.mailID, // sender address
    to: to, // list of receivers
    subject: 'The Study Plus Provide Best Teacher From all Over Worlds!', // Subject line
    text: "",
    html: `<h1 style="color: #05BAF9;">Thank You For Choosing The Study Plus.</h1>
    <h3 style="color: #0535F9;">Student Details.</h3> <h4>Name: ${obj.name}</h4>
    <p>Email Id: ${obj.email}</p><p>Phone Number: ${obj.phone}</p>
    <p>Qualification: ${obj.qualification}</p>
    <p>Address: ${obj.address}</p><p>Gender: ${obj.gender}</p>
    <p>Want Study: ${obj.message}</p><br>
    <p>Please connect with student ASAP.</p><br>
    <p>Thank You.</p><br>
    <p>The Study Plus Provides best and verified teacher from NITs and IITs. All teachers are most experience in our field. You can find the teachers for single topic or single question.
     The teacher solves the doubt within a minuts and give you best learning experience.</p>`,
     // html body
  });

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// sentmailTeacher().catch(console.error);

module.exports = {sentmailTeacher,sendmailStudent};