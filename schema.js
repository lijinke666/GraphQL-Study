const graphql = require("graphql")
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLSchema = graphql.GraphQLSchema

//模拟数据
const userData = require("./userData.json")

const userType = new GraphQLObjectType({
  name: 'User',
  fields : {
      id:{ type: graphql.GraphQLString},
      name:{ type: graphql.GraphQLString },
      sex:{ type: graphql.GraphQLString }
  }
})

const schema = new GraphQLSchema({
  query:new GraphQLObjectType({
    name:"Query",
    fields:{
      user:{
        type:userType,
        args:{                                        //描述参数，用户根据这个来查  
          id:{ type: graphql.GraphQLString }
        },
        resolve:(_,args)=>{                           //返回对应id 的数据给用户
          return userData[args.id]
        }
      }
    }
  })
})

module.exports = schema