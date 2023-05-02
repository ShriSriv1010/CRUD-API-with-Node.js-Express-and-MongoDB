const express = require('express')
const app = express()
const port = 3000


// route 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello', (req, res) => {
    res.send('Hello!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})