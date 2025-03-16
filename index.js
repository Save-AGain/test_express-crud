const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*
GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
GET /users/:id สำหรับการดึง users รายคนออกมา
PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
*/

app.use(bodyParser.json())

app.listen(8000, () => {
    console.log('Server started on port 8000')
})

let user = [];
let counter = 1;


//GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/user', (req, res) => {
    res.json(user);
})

//POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/user', (req, res) => {
    const data = req.body;

    const newUser = {
        id: counter,
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age
    }

    counter +=1;

    user.push(newUser)

    res.status(201).json({message: 'User created successfully', user: newUser});
})

//GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/user/:id', (req, res) => {
    const id = req.params.id;

    let selectedIndex = user.findIndex(user => user.id == id);

    if (user[selectedIndex]){
        res.json(user[selectedIndex]);
    } else {
        res.status(404).json({message: 'User not found'});
    }
})

app.use(express.json());

//PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    let data = req.body;

    let selectedIndex = user.findIndex(user => user.id == id);

    if(user[selectedIndex]) {
        user[selectedIndex].firstname = data.firstname || user[selectedIndex].firstname;
        user[selectedIndex].lastname = data.lastname || user[selectedIndex].lastname;
        user[selectedIndex].age = data.age || user[selectedIndex].age;

        res.status(200).json({message: 'update successfully', user: user[selectedIndex]});
    } else {
        res.status(404).json({message: 'User not found'});
    }
})

//DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/user/:id', (req, res) => {
    const id = req.params.id;

    let selectedIndex = user.findIndex(user => user.id == id);

    user.splice(selectedIndex, 1);

    res.status(200).json({message: 'delete successfully'});
})