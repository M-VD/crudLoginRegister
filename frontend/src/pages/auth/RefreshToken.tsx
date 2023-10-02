import styles from '../form.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect, useContext } from 'react'

import { getUser, loginUser, refresh } from './api/index'
import AuthContext from '../context/AuthProvider'

const RefreshToken = () => {
  const { setAuth } = useContext(AuthContext)
  const [refresht, setRefresht] = useState('')
  const [password, setPassword] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }
  const handleCreate = async () => {
    try {
      const res = await refresh()
      console.log('user', res.data)
      console.log('user', res?.data?.accessToken)

      setRefresht('')

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
    }
  }

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email: {refresht}</label>

          <input
            type="text"
            id="email"
            placeholder={refresht}
            autoComplete="off"
            onChange={(e) => setRefresht(e.target.value)}
            value={refresht}
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
export default RefreshToken
