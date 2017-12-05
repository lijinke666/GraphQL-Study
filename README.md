# GraphQL-Study
潮流的 GrapQL 试一试

## 本地调试
- `cnpm i`
- `npm start`
- open `http://localhost:1996/graphql`

## 定义Schema
```js
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
```

## 模拟数据
>userData.json
```json
[
  {
    "id":1,
    "name":"李金珂",
    "sex":"男",
    "like":{
      "book":"金瓶梅",
      "web":"React,NodeJs",
      "song":"难得"
    }
  },
  {
    "id":2,
    "name":"赵日天",
    "sex":"女",
    "like":{
      "book":"如何和sb相处",
      "web":"Vue",
      "song":"义勇军进行曲"
    }
  }
]
```
## 启动服务
```js
const http = require("http")
const express = require("express")
const app = express()
const graphql = require("graphql")
const graphqlHTTP = require("express-graphql")
const bodyParser = require("body-parser")
const schema = require("./schema")


app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({ schema: schema, pretty: true, graphiql: true }))
// app.use("/graphiql", graphqlHTTP({endpointURL: "/graphql"}))           //新版本貌似废弃了...


app.get('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.post('graphql', (req, res) => {
    graphql(schema, req.body).then((result) => {
        res.send(JSON.stringify(result))
    })
})

app.set('port', process.env.PORT || 1996)
const PORT = app.get("port")
app.listen(PORT, () => console.log(`graphql server running ${PORT}`))
```
## 查询示范

> 查询
```graphql
query{
  user(assetId:"1"){
    id
    name
    sex,
    like{
      song
      book
      web
    }
  }
}
```
> 返回
```
{
  "data": {
    "user": {
      "id": "1",
      "name": "李金珂",
      "sex": "男",
      "like": {
        "song": "难得",
        "book": "金瓶梅",
        "web": "React,NodeJs"
      }
    }
  }
}
```


