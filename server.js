const express = require("express");
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const path = require("path");
// const PORT = process.env.PORT || 3001;


const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();
app.use(bodyParser.json());

// Seconst app = express();rve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// **************************

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

// ***********************************

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// connect mongoose

/* original set up
mongoose.connect(process.env.MONGODB_URI || "mongodb://user:user123@ds147446.mlab.com:47446/heroku_dwmsrb6z")
app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
*/

/*add from other original project*/ 
const mongoURL = process.env.MONGODB_URI|| "mongodb://localhost:27017/eventsTestDb"
mongoose.connect(mongoURL, {useNewUrlParser: true})



// mongoose
//   .connect(
//     `mongodb+srv://${process.env.MONGO_USER}:${
//       process.env.MONGO_PASSWORD
//     }@cluster0-hh00e.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
//     { useNewUrlParser: true }
//     )
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
