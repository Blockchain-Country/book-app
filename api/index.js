const express = require('express')
const cors = require('cors')
const booksData = require('./data/books.json')

const app = express()

app.use(cors())

const getRandomBook = () => {
  const randomIndex = Math.floor(Math.random() * booksData.length)
  return booksData[randomIndex]
}

app.get('/random-book', (req, res) => {
  res.json(getRandomBook())
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
