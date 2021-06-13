const { message, user } = require('../../models')
const joi = require('joi')
const { Op } = require('sequelize')

exports.sendMessage = async (req, res) => {

    try {
        
        const { id } = req.params
        const { idUser } = req
        const messages = req.body.message


        const schema = joi.object({
            message: joi.string().required()
        }).validate(req.body)

        const { error } = schema

        if(error){
            return res.send({
                status: 'failed',
                message: error.details[0].message
            })
        }

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

        const data = await message.create({
            sender: idUser,
            recipient: id,
            message: messages
        })

        const dataUser = await message.findOne({
            where: {
                id: data.id
            },
            include: {
                model: user,
                as: 'Recipient',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password', 'email', 'bio', 'token']
                }
            },
            attributes: {
                exclude: ['sender', 'recipient', 'createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                Message: dataUser
            }
        })

    } catch (err) {
     
        console.log(err)
        res.status({  
            status: 'failed',
            message: 'Server Error'
        })

    }
}

exports.messageWithId = async (req, res) => {

    try {
        
        const { id } = req.params
        const { idUser } = req

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

        const messages = await message.findAll({
            where: {
                [Op.or]: [{
                    sender: id,
                    recipient: idUser
                },
                {
                    sender: idUser,
                    recipient: id
                }]
            },
            include: {
                model: user,
                as: 'Sender',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password', 'email', 'bio', 'token']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'sender', 'recipient']
            }
        })

        res.send({
            status: 'success',
            data: {
                Message: messages
            }
        })

    } catch (err) {
     
        console.log(err)
        res.status({  
            status: 'failed',
            message: 'Server Error'
        })

    }
}