const express = require('express')
const path = require('path')
const routes = require("./routes");

// App
const app = express();

// Set port
const port = process.env.PORT || 5000;
app.set("port", port);

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
