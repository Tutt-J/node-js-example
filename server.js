require('dotenv').config()
const app = require("./app.js");
var cors = require('cors')

const port = process.env.PORT

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 
}

app.use(cors())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
