const graphql = require("graphql")
const { GraphQLObjectType, GraphQLSchema } = graphql

//模拟数据
const userData = require("./userData.json")

const LikeType = new GraphQLObjectType({
  name: "Like",
  fields: {
    book: { type: graphql.GraphQLString },
    web: { type: graphql.GraphQLString },
    song: { type: graphql.GraphQLString }
  }
})

//定义每个字段的类型
const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    sex: { type: graphql.GraphQLString },
    like: { type: LikeType }                     //每个user 里面有个like,这样可以嵌套
  }
})



const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      user: {
        type: userType,
        args: {                                        //描述参数，用户根据这个来查  
          assetId: { type: graphql.GraphQLString },
          name: { type: graphql.GraphQLString }
        },

        /**
         * 返回对应id 的数据给用户
         */
        resolve: (parentValue, args, request) => {
          // console.log(args);
          return userData.find(({ id, name }) => id == args.assetId || name == args.name)
        }
      }
    }
  })
})

module.exports = schema