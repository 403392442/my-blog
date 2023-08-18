const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./schema/schema')

const app = express();
app.use(cors());
connectDB();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

const PORT = 3001;
app.listen(PORT, () => {console.log(`server started on port ${PORT}`)})