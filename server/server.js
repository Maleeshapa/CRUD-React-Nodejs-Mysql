// --------------------------------------------------Basic--------------------------------------------------

import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app =express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'crud',
})

app.listen(8081,()=>{
    console.log("listening");
})


// ---------------------------------------------------Read all db---------------------------------------------------

app.get('/', (req, res)=>{
    const sql = "SELECT * FROM student";
    db.query(sql,(err,result) => {
        if(err) return res.json({Message: "server error"});
        return res.json(result);
    })
})

// ---------------------------------------------------Create-----------------------------------------------

app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (Name, Email) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.email
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, error: err.message });
        }
        console.log("Record inserted successfully");
        return res.json({ success: true, result: result });
    });
});


// -------------------------------------------------------Update Read by id--------------------------------------------

app.get('/read/:id', (req, res)=>{
    const sql = "SELECT * FROM student WHERE Id=?";
    const id = req.params.id;

    db.query(sql,id,(err,result) => {
        if(err) return res.json({Message: "server error"});
        return res.json(result);
    })
})

app.put('/update/:id', (req,res)=>{
    const sql = 'UPDATE student SET `name`=? , `Email`=? WHERE Id=?';
    const id = req.params.id;
    db.query(sql,[req.body.name, req.body.email, id], (err, result) => {
        if(err) return res.json({Message: "server error"});
        return res.json(result);
    })

})

// -----------------------------------------------------------Delete--------------------------------------------


app.delete('/delete/:id', (req, res)=>{
    const sql = "DELETE FROM student WHERE Id=?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if(err) return res.json({ success: false, error: err.message });
        return res.json({ success: true, message: "Record deleted successfully" });
    });
});
