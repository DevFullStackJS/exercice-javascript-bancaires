
const mongoose = require('mongoose');

const app = require('./app');
const port = process.env.PORT || 5000;

const urlMongo = 'mongodb+srv://7Z0tB7RV4yVuG6fPm7m:7Z0tB7RV4yVuG6fPm7m@cluster0.ddlxp.azure.mongodb.net/nodejsauth';

mongoose
  .connect(urlMongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

require('./user/user.model');

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`)
});

