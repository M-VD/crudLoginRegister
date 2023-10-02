import styles from '../form.module.scss'
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { deleteProduct, getProducts, updateProduct } from '../api'

const EditForm = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>(null)
  const [validName, setValidName] = useState(true)
  const [titleFocus, setUserFocus] = useState(false)
  const [title, setTitle] = useState('')
  const [posts, setPosts] = useState([])
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef?.current?.focus()
  }, [])

  useEffect(() => {
    getProducts().then((res) => {
      setPosts(res.data)
      console.log(res)
    })
  }, [])

  /*   useEffect(() => {
    setValidName(USER_REGEX.test(title))
  }, [title]) */

  useEffect(() => {
    setErrMsg('')
  }, [title, description])
  const handleDelete = async (id: any) => {
    const res = await deleteProduct(id)
  }

  const handleUpdate = async (
    productId: String,
    title: String,
    description: string,
    price: Number
  ) => {
    try {
      const res = await updateProduct({
        productId,
        title,
        description,
        price,
      })

      console.log(`update`, res)

      setTitle('')
      setDescription('')
      setPrice(0)

      setSuccess(true)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          setErrMsg('No Server Response')
        } else if (err.response?.status === 409) {
          setErrMsg('Username Taken')
        } else {
          setErrMsg('Registration Failed')
        }
      }
      errRef.current?.focus()
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      {posts.map((val: any, key: any) => {
        return (
          <div id={key}>
            <div>
              <h3>Title: {val.title}</h3>
              <h3>Description: {val.description}</h3>
              <h3>Price: {val.price}</h3>
            </div>
            <div>
              <section>
                <p
                  ref={errRef}
                  className={
                    errMsg ? `${styles.errmsg}` : `${styles.offscreen}`
                  }
                  aria-live="assertive"
                >
                  {errMsg}
                </p>

                <form onSubmit={handleSubmit}>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    id="description"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby="description"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setPrice(e.target.valueAsNumber)}
                    value={price}
                    required
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby="price"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />

                  <button>yyy</button>
                </form>
              </section>
              <button
                onClick={() => {
                  handleUpdate(val.productId, title, description, price)
                }}
              >
                Update
              </button>{' '}
              *
              <button
                onClick={() => {
                  handleDelete(val.productId)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default EditForm
