import styles from '../form.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

import { registerUser } from './api'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }
  const handleCreate = async () => {
    try {
      const res = await registerUser({
        email,
        password,
        passwordConfirmation,
        firstName,
        lastName,
      })

      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
      setFirstName('')
      setLastName('')

      navigate('/login')
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
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <label htmlFor="passwordConfirmation">PasswordConfirmation:</label>
          <input
            type="text"
            id="passwordConfirmation"
            autoComplete="off"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            required
          />

          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
          />

          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
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
export default RegisterForm
