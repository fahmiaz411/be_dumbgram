const express = require('express')

const router = express.Router()

// const { getData, 
//         getDetail, 
//         addData, 
//         updateData,
//         deleteData} = require('../controllers/todo')

const { auth } = require('../middleware/auth')

const { register, 
        login,
        getUsers, 
        getFollow,
        editProfile, 
        deleteUser} = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)
router.get('/users', getUsers)
router.get('/followers/:id', auth, getFollow)
router.patch('/user', auth, editProfile)
router.delete('/user/:id', deleteUser)

// router.get('/', getData)
// router.get('/users/:id', getDetail)
// router.post('/register', addData)
// router.patch('/users/:id', updateData)
// router.delete('/users/:id', deleteData)

module.exports = router