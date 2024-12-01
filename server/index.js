const express = require('express');
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json())
app.use('/declerations', require('./routes'))

app.get('/', (req, res) => {
    res.send('welcome!')
})

const port = process.env.PORT || 4040
app.listen(port, () => {
    console.log('listening to port: ', port);
})