const PORT = 3001;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/User')
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(cors({
    origin:['*'],
    methods:['GET','POST'],
    credentials:true
}));
app.use(cookieParser());

mongoose.connect('mongodb+srv://admin:admin@cluster0.luhx5qb.mongodb.net/?retryWrites=true&w=majority')

app.post('/register',(req,res) => {
    const {name,email,password} = req.body;
    bcrypt.hash(password,10)
    .then((hash) => {
        UserModel.create({name,email,password:hash})
        .then((user) => res.json({status:'Success'}))
        .catch((err) => res.json(err));
    }).catch((err) => res.json(err));
})

app.post('/login',(req,res) => {
    const {email,password} = req.body;
    UserModel.findOne({email:email})
    .then((user) => {
        if(user){
            bcrypt.compare(password,user.password,(err,response) => {
                if(response){
                    const token = jwt.sign({email:user.email,role:user.role},"jwt-secret-key",{expiresIn:'1d'});
                    res.cookie('token',token);
                    return res.json({Status:"Success",role:user.role});
                }else{
                    return res.json("Password is incorrect")
                }
            });
        }else{
            return res.json("No record exists");
        }
    })
})

app.post('/forgot-password',(req,res) => {
    const {email} = req.body;
    UserModel.findOne({email:email})
    .then((user) => {
        if(!user){
            return res.send({Status:"User does not exists"});
        }
        const token = jwt.sign({id:user._id},"jwt_secret_key",{expiresIn:'1d'});

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'balajithestar069@gmail.com',
            pass: 'xsyj ovee zlbq qtxr'
          }
        });

        var mailOptions = {
          from: 'balajithestar069@gmail.com',
          to: email,
          subject: 'Reset your password',
          text: `http://localhost:3000/reset-password/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status:"Success"});
          }
        });
    })
})

app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                UserModel.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
})

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
})
