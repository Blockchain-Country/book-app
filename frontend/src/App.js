import BookForm from './components/bookForm/BookForm.js'
import Filter from './components/filter/Filter.js'
import BookList from './components/bookList/BookList.js'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header" data-testid="app_main_header">
        <h1>Book Library App</h1>
      </header>
      <main className="app-main">
        <div className="app-left-column">
          <BookForm />
        </div>
        <div className="app-right-column">
          <Filter />
          <BookList />
        </div>
      </main>
    </div>
  )
}

export default App
