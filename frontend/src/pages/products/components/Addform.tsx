import styles from '../form.module.scss'
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { createProduct } from '../api'

const AddForm = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>(null)
  const [validName, setValidName] = useState(true)
  const [titleFocus, setUserFocus] = useState(false)
  const [title, setTitle] = useState('')

  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef?.current?.focus()
  }, [])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }
  const handleCreate = async () => {
    try {
      const res = await createProduct({
        title,
        description,
        price,
      })

      setTitle('')
      setDescription('')
      setPrice(0)

      setSuccess(true)
      //clear state and controlled inputs
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

  return (
    <div>
      <section>
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

          <button
            onClick={() => {
              handleCreate()
            }}
          >
            Create
          </button>
        </form>
      </section>
    </div>
  )
}
export default AddForm
