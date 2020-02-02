const express = require('express')
const path = require('path')
const Sentiment = require('sentiment')

const port = 3000
const app = express()

app.use(express.static(path.join(__dirname, 'client')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/healthcheck' , function(req, res){
    res.send("HealthCheck : true")
})
app.get('/emotion', function(req, res) {
  const sentiment = new Sentiment()
  const text = req.query.text
  const score = sentiment.analyze(text)

  res.send(score)
})

app.listen(port, function() {
  console.log(`Application Started and Listening to port ${port}`)
})