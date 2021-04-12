const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require("dotenv").config();
const app = express()                 
const port = 3056

app.use(express.json())


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pratheek.prathee@gmail.com',
      pass: '9980088293'
    }
  });

  // verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  app.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var subject = req.body.subject
    var message = req.body.message
  
    var mail = {
      from: email,
      to: "pratheek.prathee@gmail.com",
      subject: subject,
      text: message
    }
    
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  })
  
  app.listen(port,()=>{
    console.log('server is running on port ',port)
})