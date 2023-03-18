const express = require('express')
const bodyParser = require('body-parser')

const app = express()
require('dotenv').config()
require('./models/db')
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))

app.get('/', async (req, res) => {
    res.send("hello")
})
app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/user'))
app.use('/light', require('./routes/light'))

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