const Task = require('../Models/TaskModel');

const createTask = (req, res) => {
    try {

        let newTask = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            created_by: req.headers._id
        };

        const task = new Task(newTask);
        task.save((err) => {
            if (err) {
                res.send(500, { status: false, message: 'Something went wrong', data: err })
            }
            res.send(200, { status: true, message: 'Task Created successfully' })
        })
    } catch (err) {
        console.log("error ", err)
        res.send(500, { status: false, message: "Something went to wrong", error: err });
    }
};

const getTaskByUserId = async (req, res) => {
    try {
        const { id } = req.body;
        const created_by = req.headers._id;
        const task = await Task.find({ _id: id, created_by })
        res.send(200, { status: true, data: task })

    } catch (err) {
        res.send(500, { status: false, message: "Something went to wrong", error: err });
    }
};
const fetchAllTask = async (req, res) => {
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
                    'user_name': '$user_name.first_name',
                }
            },
        ]).exec((err, result) => {
            if (err) {
                res.send(500, { status: false, message: "Something went to wrong", error: err });
            }
            if (result) {
                res.send(200, { status: true, data: result })
            }
        });
    } catch (err) {
        res.send(500, { status: false, message: "Something went to wrong", error: err });
    }
};

const fetchTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const created_by = req.headers._id;
        const taskCount = await Task.find({ _id: id, created_by })
        if (taskCount.length > 0) {
            res.send(200, { status: true, message: "Success", data: taskCount[0] })
        } else {
            res.send(200, { status: false, message: 'Edit Restricetd!' })
        }
    } catch (err) {
        res.send(500, { status: false, message: "Something went to wrong", error: err });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const created_by = req.headers._id;
        const taskCount = await Task.find({ _id: id, created_by })
        if (taskCount.length > 0) {
            Task.findByIdAndUpdate({ _id: id, created_by }, { $set: req.body }, (err, task) => {
                if (err) {
                    res.send(500, { message: 'Something went wrong', data: err })
                }
                res.send(200, { status: true, message: "Task Updated Successfully!" })
            });
        } else {
            res.send(500, { message: 'Edit Restricetd!' })
        }

    } catch (err) {
        res.send(500, { status: false, message: "Something went to wrong", error: err });
    }

};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const created_by = req.headers._id;
        const taskCount = await Task.deleteOne({ _id: id, created_by });
        const { deletedCount } = taskCount;
        res.send(200, { status: true, data: deletedCount })
    } catch (err) {
        res.send(500, { status: false, message: "Something went to wrong", error: err });
    }
}

module.exports = {
    createTask,
    getTaskByUserId,
    fetchAllTask,
    updateTask,
    fetchTaskById,
    deleteTask
}
