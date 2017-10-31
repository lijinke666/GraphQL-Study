const express = require('express')
const bodyParser = require('body-parser')
const {
    graphiqlExpress,
    graphqlExpress
} = require('apollo-server-express')

const mySchema = require('./schema/connect')
const PORT = 1996
const app = express()

app.use('/graphql',bodyParser.json(),graphiqlExpress({schema:mySchema}))    //接口中间键
app.get('/graphiql',graphiqlExpress({encodeURI:'/graphql'}))      //浏览器调试

app.listen(PORT,()=> console.log(`server is runing ${PORT}`))