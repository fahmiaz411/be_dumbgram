const { nanoid } = require('nanoid')
const { user } = require('../../models')

exports.addUser = async (req, res) => {
    
    try {
        
        const { email, username, password, fullName } = req.body
        const token = nanoid(36)

        const data = {
            email: email,
            username: username,
            password: password,
            fullName: fullName,
            token: token
        }

        const dataBody = {
            fullName: fullName,
            username: username,
            token: token
        }

        await user.create(data)

        res.send({
            status: 'success',
            data: {
                user: dataBody
            }
        })

    } catch (error) {

        console.log(error)

        res.status({
            status: 'failed',
            message: 'Server Error'            
        })
    }
    
}

exports.login = async (req, res) => {

    const { email, password } = req.body

    const data = await user.findOne({
        where: {
            email
        }
    })    
    
    if(!data){
        return res.send({
            status: 'failed',
            message: `email ${email} tidak ditemukan!`
        })
    } else if (data && data.password != password) {
        return res.send({
            status: 'failed',
            message: 'Password salah!'
        })
    }
    
    const { fullName, username, token } = data
    const dataBody = {
        fullName: fullName,
        username: username,
        email: email,
        token: token
    }

    res.send({
        status: 'success',
        data: {
            user: dataBody
        }
    })
}