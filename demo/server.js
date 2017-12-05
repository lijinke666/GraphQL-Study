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