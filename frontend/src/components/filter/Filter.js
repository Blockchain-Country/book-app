import { useDispatch, useSelector } from 'react-redux'
import './Filter.css'
import {
  SET_TITLE_FILTER,
  SET_AUTHOR_FILTER,
  SET_ONLY_FAVORITE,
  RESET_FILTERS,
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/FiltersSlice.js'

const Filter = () => {
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)

  const handleTitleFilter = (e) => {
    dispatch(SET_TITLE_FILTER(e.target.value))
  }

  const handleAuthorFilter = (e) => {
    dispatch(SET_AUTHOR_FILTER(e.target.value))
  }

  const handleResetFilters = () => {
    dispatch(RESET_FILTERS())
  }

  const handleOnlyFavoriteFilter = () => {
    dispatch(SET_ONLY_FAVORITE())
  }

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="filter by title..."
            value={titleFilter}
            onChange={handleTitleFilter}
          ></input>
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="filter by author..."
            value={authorFilter}
            onChange={handleAuthorFilter}
          ></input>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteFilter}
            />
            Only Favorite
          </label>
        </div>
        <button onClick={handleResetFilters}>Clear Filters</button>
      </div>
    </div>
  )
}

export default Filter
