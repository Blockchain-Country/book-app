import axios from 'axios'

const getGoogleBookViaApi = async () => {
  try {
    const res = await axios.get(
      'https://www.googleapis.com/books/v1/volumes?q=4'
    )
    const items = res.data.items

    if (!items || items.length === 0) {
      throw new Error('No books found')
    }

    const randomIndex = Math.floor(Math.random() * items.length)
    const randomBook = items[randomIndex].volumeInfo
    console.log(randomBook)

    // Safely access properties
    const title = randomBook.title || 'Unknown Title'
    const year = randomBook.publishedDate
      ? randomBook.publishedDate.split('-')[0]
      : 'Unknown Year'
    const author = randomBook.authors ? randomBook.authors[0] : 'Unknown Author'
    const description = randomBook.description || 'No description available'
    const image = randomBook.imageLinks?.thumbnail || ''

    return { title, year, author, description, image }
  } catch (error) {
    console.error('Error fetching book data:', error)
    // Return a fallback value in case of error
    return {
      title: 'Unknown',
      year: 'Unknown',
      author: 'Unknown',
      description: 'Error fetching book',
      image: '',
    }
  }
}

export default getGoogleBookViaApi
