import { useTranslation } from 'react-i18next'
import BookForm from './components/bookForm/BookForm.js'
import Filter from './components/filter/Filter.js'
import BookList from './components/bookList/BookList.js'
import './utils/i18n.js'
import './App.css'

function App() {
  const { t, i18n } = useTranslation()

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <div className="app">
      <header className="app-header" data-testid="app_main_header">
        <h1>{t('appName')}</h1>
        <div className="language-selector">
          <select onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
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
