const bcrypt = require('bcrypt')
const { user, follow } = require('../../models')
const joi = require('joi')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    
    try {        

        const { username, fullName, password } = req.body
        const data = req.body        

        const schema = joi.object({
            fullName: joi.string().min(8).required(),         
            username: joi.string().min(8).required(),
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
            image: joi.string().required(),
            bio: joi.string().allow(null).allow('')
        }).validate(data)

        if(schema.error){
            return res.send({
                status: 'failed',
                message: schema.error.details[0].message
            })
        }
        
        const hashPassword = await bcrypt.hash(password, 10)
        
        const dataBody = {
            fullName: fullName,
            username: username,
            password: hashPassword
        }
        
        await user.create({
            ...data,
            password: hashPassword
        })        

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
    
    try {

        const { email, username, password } = req.body

        if(!email && !username){
            return res.send({
                status: 'failed',
                message: "Email or username could'nt empty"
            })
        }

        if(username){
            data = await user.findOne({
                where: {
                    username
                }
            })
        } else if (email) {
            data = await user.findOne({
                where: {
                    email
                }
            })
        } else {
            return res.send({
                status: 'failed',
                message: 'Email or password wrong!'
            })
        }
        
        if(!data){
            return res.send({
                status: 'failed',
                message: `Email or password wrong!`
            })
        }
        
        const hashPassword = await bcrypt.compare(password, data.password)

        if(!hashPassword){
            return res.send({
                status: 'failed',
                message: `Email or password wrong!`
            })
        }

        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign({
            id: data.id
        }, secretKey)

        const { fullName } = data
    
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

    } catch (error) {
        
        console.log(error)

        res.status({
            status: 'failed',
            message: 'Server Error'            
        })
    }

}

exports.getUsers = async (req, res) => {

    try {
        
        const users = await user.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'token']
            }
        })

        res.send({
            status: 'success',
            data: {
                users
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

exports.getFollow = async (req, res) => {
   
    try {
        
        const { id } = req.params

        const users = await user.findOne({
            where: {
                id
            },
            include: [
                {
                    model: follow,
                    as: 'follower',
                    include: {
                        model: user,
                        as: 'follower',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'token', 'password',]
                        }
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idFollower', 'idFollowing']
                    }
                },
                {
                    model: follow,
                    as: 'following',
                    include: {
                        model: user,
                        as: 'following',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'token', 'password']
                        }
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idFollower', 'idFollowing']
                    }
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'token', 'password', 'image', 'bio']
            }
        })

        if(!users){
            res.send({                
                status: 'failed',
                message: `Data with id: ${id} not found!`
            })
        }

        res.send({
            idUser: req.idUser,
            status: 'success',
            data: users
        })

    } catch (error) {

        console.log(error)

        res.status({
            status: 'failed',
            message: 'Server Error'            
        })
    }

}

exports.editProfile = async (req, res) => {

    try {
        
        const { idUser, body } = req

        await user.update(body, {
            where: {
                id: idUser
            }            
        })

        const updatedUser = await user.findOne({
            where: {
                id: idUser
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'token']
            }
        })

        res.send({
            status: 'success',
            data: updatedUser
        })

    } catch (error) {
        
        console.log(error)

        res.status({
            status: 'failed',
            message: 'Server Error'            
        })

    }

}

exports.deleteUser = async (req, res) => {

    try {

        const { id } = req.params

        const check = await user.findOne({
            where: {
                id
            }
        })

        if(!check){
            return res.send({
                status: 'failed',
                message: `User with id ${id} not found`
            })
        }

        await user.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            id: check.id
        })
        
    } catch (error) {
        
        console.log(error)

        res.status({
            status: 'failed',
            message: 'Server Error'            
        })

    }
}