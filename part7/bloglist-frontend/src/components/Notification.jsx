import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification.message)
  const type = useSelector((state) => state.notification.type)
  var style = type ? 'success' : 'error'

  if (type === null) {
    style = null
  }

  console.log(notification)
  console.log(style)
  return <div className={style}>{notification}</div>
}

export default Notification
