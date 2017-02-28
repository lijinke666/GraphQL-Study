const http = require("http")
const express = require("express")
const app = express()
const graphql = require("graphql")
const graphiqlExpress = require("express-graphql")
const bodyParser = require("body-parser")
const schema = require("./schema")


app.use(bodyParser.json())
app.use('/graphql',graphiqlExpress({ schema:schema,pretty:true }))
// app.use("/graphiql", graphiqlExpress({endpointURL: "/graphql"}))

// app.post('graphql',( req, res )=>{
//   graphql(schema,req.body).then((result)=>{
//     res.send(JSON.stringify(result))
//   })
// })

app.set('port',process.env.PORT || 1996)
const PORT = app.get("port")
app.listen(PORT,()=> console.log(`graphql server running ${PORT}`))