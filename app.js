const express = require('express');
const bodyParser = require('body-parser');
const product = require('./Routes/Task'); // Imports routes for the products
const user = require('./Routes/User');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const Task = require('./Models/TaskModel');
const keys = require('./Config/keys')

app.use(cors());
/* Parsing the Data from client side (Json Format) */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/user', user);
app.use('/tasks', product);

let port = 5000;

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true },()=>{
    console.log("Connected to database Successfully!")
})

/** 
 * API to fetch all the task details added by users using socketIo
*/

io.on('connection', (socket) => {
    socket.on('fetchAll', () => {
        try {
            Task.aggregate([
                {
                    '$addFields': {
                        'created_by': { $toObjectId: '$created_by' },
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'created_by',
                        foreignField: '_id',
                        as: 'user_name'
                    }
                },
                {
                    '$unwind': {
                        'path': '$user_name',
                        'preserveNullAndEmptyArrays': true
                    }
                },
                {
                    '$project': {
                        '_id': 1,
                        'name': '$name',
                        'description': '$description',
                        'status': '$status',
                        'created_by': '$created_by',
                        'createdAt': { '$dateToString': { format: "%Y-%m-%d %H:%M:%S", date: "$createdAt" } },
                        'updatedAt': { '$dateToString': { format: "%Y-%m-%d %H:%M:%S", date: "$updatedAt" } },
                        'user_name': '$user_name.first_name'
                    }
                },
            ]).exec((err, result) => {
                if (err) {
                    console.log("Error", err)
                }
                if (result) {
                    //console.log("Result ", result)
                    io.emit('taskDetails', result)
                }
            });
        } catch (err) {
            console.log("Error", err)
        }
    })
});

http.listen(port, () => {
    console.log(`Server is up and running on port numner${port}`);
});

