const express = require('express')
const path = require('path')
const routes = require("./routes");
const mongoose = require("mongoose");

// App
const app = express();

// Set port
const port = process.env.PORT || 5000;
app.set("port", port);

const urlMongo = 'mongodb+srv://7Z0tB7RV4yVuG6fPm7m:7Z0tB7RV4yVuG6fPm7m@cluster0.ddlxp.azure.mongodb.net/nodejsauth';
mongoose
  .connect(urlMongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.static(path.join(__dirname, '../../build')))
  .set('static', path.join(__dirname, 'static'))

app.use('/api', routes);
  
app.listen(port, () => console.log(`Server running on localhost:${port}`));


// express()
//   .use(express.static(path.join(__dirname, '../../build')))
//   .set('static', path.join(__dirname, 'static'))
//   // .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('../../build/index.html'))

//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
