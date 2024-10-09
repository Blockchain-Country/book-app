import { useDispatch, useSelector } from 'react-redux'
import './Filter.css'
import {
  SET_TITLE_FILTER,
  selectTitleFilter,
} from '../../redux/slices/FiltersSlice.js'

const Filter = () => {
  const dispatch = useDispatch()
  const titlefilter = useSelector(selectTitleFilter)

  const handleTitleFilter = (e) => {
    dispatch(SET_TITLE_FILTER(e.target.value))
  }

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="filter by title..."
            value={titlefilter}
            onChange={handleTitleFilter}
          ></input>
        </div>
      </div>
    </div>
  )
}

export default Filter
