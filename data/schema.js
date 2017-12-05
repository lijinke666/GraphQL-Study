import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    cursorForObjectInConnection,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
    toGlobalId,
} from 'graphql-relay'

import userData from "./userData.json"

const LikeType = new GraphQLObjectType({
    name: "Like",
    fields: {
        book: { type: GraphQLString },
        web: { type: GraphQLString },
        song: { type: GraphQLString }
    }
})

//定义每个字段的类型
const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        sex: { type: GraphQLString },
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
                    assetId: { type: GraphQLString },
                    name: { type: GraphQLString }
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