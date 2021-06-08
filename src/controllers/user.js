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