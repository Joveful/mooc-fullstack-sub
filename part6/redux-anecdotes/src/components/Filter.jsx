import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      filter
      <input
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
    </div>
  )
}

export default Filter
