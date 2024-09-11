const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//database connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'project',
    port:3306
});

//check db connect
db.connect(err=>{
    if(err) {console.log(err,'err');}
    console.log('database connected...');
})

//get data
app.get('/employee',(req,res)=>{
    
    let qr =`select*from employee`;
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }

        if(result.length>0)
        {
            res.send({
                message:'all user data',
                data:result
            });
        }
    });
    
});

//get single data
app.get('/employee/:id',(req,res)=>{

    let gID = req.params.id;
    let qr = `select * from employee where em_id = ${gID}`;

    db.query(qr,(err,result)=>{

        if(err){console.log(err);}

        if(result.length>0)
        {
            res.send({
                message:'get single data',
                data:result
            });
        }
        else
        {
            res.send({
                message:'data not found'
            });
        }
    });
});

//create
app.post('/employee',(req,res)=>{
    console.log(req.body,'create data');

    let name = req.body.name;
    let lastname = req.body.last_name;
    let gender = req.body.gender;
    let birth = req.body.birth_date;

    let qr =`insert into employee(name,last_name,gender,birth_date)
                value ('${name}','${lastname}','${gender}','${birth}')`;
    
    db.query(qr,(err,result)=>{
        
        if(err){console.log(err);}
        console.log(result,'result')
            res.send({
                message:'data inserted'
            });
       
    })
})

//update
app.put('/employee/:id',(req,res)=>{

    console.log(req.body,'update data');

    let gID = req.params.id;
    let name = req.body.name;
    let lastname = req.body.last_name;
    let gender = req.body.gender;
    let birth = req.body.birth_date;

    let qr = `update employee set name = '${name}', last_name = '${lastname}', gender = '${gender}', birth_date = '${birth}'
                where em_id = ${gID}`;
    
    db.query(qr,(err,result)=>{

        if(err){console.log(err);}

        res.send({
            message:'data updated'
        });
    })
})

//delete
app.delete('/employee/:id',(req,res)=>{
    let qID = req.params.id;

    let qr = `delete from employee where em_id = '${qID}' `;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send(
            {
                message:'data delete'
            }
        )
    })
})


app.listen(3000,()=>{
    console.log('server running...');
});