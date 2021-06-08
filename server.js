const express = require('express')
const router = require('./src/routers')

const app = express()

app.use(express.json())

app.use('/api/v1/', router)

const port = 5001

app.listen(port, () => {
    console.log(`Your server running on port ${port}`)
})