const types = `
    type User {
        id : Int
        name: String
        family : [Family]
    }

    type Family {
        id: Int,
        sex: String         
        age: String           
        father: String
        mother: String
    }

    type Query {      # 定义查询内容
        user(name:String) : User
    }
`

module.exports = types