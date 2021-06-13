const express = require('express')

const router = express.Router()

const { auth } = require('../middleware/auth')

// User

const { register, 
        login,
        getUsers, 
        getFollow,
        editProfile, 
        deleteUser} = require('../controllers/user')

// Feed

const { addFeed,
        feedByFollow,
        feeds,
        like, 
        comments,
        addComment} = require('../controllers/feed')

// Message

const { sendMessage, messageWithId } = require('../controllers/message')

//Route User

router.post('/register', register)
router.post('/login', login)
router.get('/users', getUsers)
router.get('/followers/:id', auth, getFollow)
router.patch('/user', auth, editProfile)
router.delete('/user/:id', deleteUser)

// Route Feed

router.post('/feed', auth, addFeed)
router.post('/comments', auth, addComment)
router.patch('/like', auth, like)
router.get('/feed', auth, feedByFollow)
router.get('/feeds', auth, feeds)
router.get('/comments/:id', auth, comments)

// Route Message

router.post('/message/:id', auth, sendMessage)
router.get('/message/:id', auth, messageWithId)

module.exports = router