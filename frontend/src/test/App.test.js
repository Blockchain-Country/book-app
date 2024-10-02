import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import store from '../redux/store.js'
import App from '../App'

test('renders header "Book Library App"', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const linkElement = screen.getByTestId('app_main_header')
  expect(linkElement).toBeInTheDocument()
})
