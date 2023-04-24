const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

require('dotenv').config()
require('./models/db')

const {connectBrokers} = require('./controllers/mqttController')
const {scheduleActions} = require('./controllers/timerController')
connectBrokers()
scheduleActions()

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))
app.use(cookieParser())

app.get('/', async (req, res) => {
    res.send("hello")
})
app.use('/refresh', require('./routes/refresh'))

app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/logout', require('./routes/logout'))

app.use('/user', require('./routes/user'))
app.use('/devices', require('./routes/devices'))
app.use('/temp', require('./routes/temp'))
app.use('/humid', require('./routes/humid'))

app.use('/timers', require('./routes/timer'))

app.listen(PORT, () => {
    /*axios.get('https://io.adafruit.com/api/groups/Default/receive.json?x-aio-key=aio_hIUx48oBVOP2TsNLn07BbAc9mQAa')
    .then((res) => {
        console.log(res.data)
    })
    axios.post('https://io.adafruit.com/api/groups/Default/send.json?x-aio-key=aio_hIUx48oBVOP2TsNLn07BbAc9mQAa&bbc-led=3')
    .then((res) => {
        console.log(res)
    })*/
    console.log(`Server is running on port ${PORT}`)
})