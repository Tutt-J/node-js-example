require("dotenv").config();
const app = require("./app.js");
var cors = require("cors");
const {limiter, speedLimiter} = require('./app/helpers/limiters.js')
const helmet = require("helmet");
const port = process.env.PORT;



var corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));

app.use(limiter)
app.use(speedLimiter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
