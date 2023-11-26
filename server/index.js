const express = require("express");
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql")
const schema = require("./schema/schema");
const connectDB = require("./conflig/db");
const port = process.env.PORT || 8000;

const app = express();

//Connect to Database
connectDB();

//midlware
app.use(cors());

app.use( "/graphql",
graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === "development",
}))

app.listen(port , console.log(port))