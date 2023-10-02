import { Link } from 'react-router-dom'
import styles from './form.module.scss'
const Missing = () => {
  return (
    <article style={{ padding: '100px' }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className={` ${styles.flexGrow} `}>
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  )
}

export default Missing
