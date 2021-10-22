const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const { json } = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kehinde',
    database: 'nodeuser'
});

app.connect((err) => {
    if (err) {
        console.log(err, 'error connecting to db.....')
    }
    console.log('database connected.......');
})

//Get All Users
app.get('/user', (req,res)=>{
let query = `select * from user`;

db.query(query, (err, result)=>{
    if(err){
        console.log(err, 'error in getting user');
    }
    if(result.length > 0){
        res.send({
            message: 'All User Data',
            data: result
        });
    }
} )

})

//Get One User
app.get('/user/:id', (req, res)=>{
    let uid = req.params.id;
    let query = `select * from user where id = ${uid}`;
    db.query(query, (err,result)=>{
        if(err){console.log(err, 'error getting user data')}
        if(result.length > 0){
            res.send({
                message: 'Get Single User Data',
                data: result
            });
        }else {
            res.send({
                message: 'Data not found'
            })
        }
    })
    
})


//Delete User
app.delete('/user/:id', (req, res)=>{
    let uid = req.params.id;
    let query = ` delete from user where id = ${uid}`
    db.query(query, (err, result)=>{
        if(err){ console.log(err, 'error deleting user')}
        res.send({
            message: 'User Deleted'
        })
    })
})

//Post new User
app.post('/user', (req,res)=>{

    let fname = req.body.firstname;
    let lname = req.body.lastname;
    let Email = req.body.email;
    let tel = req.body.telephone;

    let query = `insert into user(firstname, lastname,email,telephone)
                    values('${fname}','${lname}','${Email}', '${tel}')`;
    
    db.query(query, (err, result)=>{
        if(err){console.log(err, 'error creating new user...')}
        if(result){
            res.send({
                message: 'New User Created'
            })
        }
    })
})










app.listen(3000, () => {
    console.log('database running')
})
