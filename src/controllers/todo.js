let dataUser = [
    {
        id: "1",
        username: "dindaputri",
        password: "myCustomPassword",
        fullname: "Dinda Adinda Putri"
    },
    {
        id: "2",
        username: "fahmiaz",
        password: "myCustomPassword",
        fullname: "Fahmi Aziz"
    },
    {
        id: "3",
        username: "m_wahyudi",
        password: "myCustomPassword",
        fullname: "Muhammad Wahyudi"
    }
]

exports.getData = (req, res) => {
    res.send({
        status: 'success',
        data: dataUser
    })
}

exports.getDetail = (req, res) => {
    const {id} = req.params

    const data = dataUser.find((data) => data.id == id)

    if(!data){
        return res.send({
            status: 'failed',
            message: `Data with id: ${id} not found`
        })
    }
    res.send({
        status: 'success',
        data        
    })
}

exports.updateData = (req, res) => {
    const {id} = req.params
    const {body} = req
    const {username, password, fullname} = body
    const checkId = dataUser.find((data) => data.id == id)

    if(!checkId){
        return res.send({
            status: 'failed',
            message: `Data with id: ${id} not found`
        })
    }

    const dataBody = {
        id: id,
        username: username,
        password: password,
        fullname: fullname
    }

    const newData = dataUser.map((data) => {
        if(data.id == id){
            return dataBody
        } else {
            return data
        }
    })

    dataUser = newData

    res.send({
        status: 'success',
        data: dataBody
    })
}

exports.addData = (req, res) => {
    const {body} = req

    dataUser = [...dataUser, body]

    res.send({
        status: 'success',
        data: body
    })
}

exports.deleteData = (req, res) => {
    const {id} = req.params
    const checkId = dataUser.find((data) => data.id == id)

    if(!checkId){
        return res.send({
            status: 'failed',
            message: `Data with id: ${id} not found`
        })
    }

    const newData = dataUser.filter((data) => data.id != id)

    dataUser = newData

    res.send({
        status: 'success',
        message: `Data with id: ${id} deleted`,
        data: dataUser
    })
}

