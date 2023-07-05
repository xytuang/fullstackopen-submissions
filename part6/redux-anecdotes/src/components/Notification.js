import { useSelector } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification