const express = require('express')

const router = express.Router()

// const { getData, 
//         getDetail, 
//         addData, 
//         updateData,
//         deleteData} = require('../controllers/todo')

const { addUser } = require('../controllers/user')

router.post('/register', addUser)

// router.get('/', getData)
// router.get('/users/:id', getDetail)
// router.post('/register', addData)
// router.patch('/users/:id', updateData)
// router.delete('/users/:id', deleteData)

module.exports = router