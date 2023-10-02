const { parseWithComments } = require('jest-docblock')

//import { signJwtAccess } from '../utils/jwt.utils'
//import connect from '../utils/connect'
import {
  connectDBForTesting,
  disconnectDBForTesting,
} from '../utils/connectDBForTesting.ts'
import UserModel from '../models/user.model'
import app from '../app'
// Get cookies from response

import request from 'supertest'

//const userId = new mongoose.Types.ObjectId()
let token: any
let userId: any
let response: any

const jwt = 'qwerty-1234567890'
const agent = request.agent(app)
export const productPayload = {
  //user: userId,

  title: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
  description:
    'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
  price: 879.99,
}
export const userPayload = {
  //user: userId,

  firstName: 'michael',
  lastName: 'Van Daele',
  email: 'mantis@gmail.com',
  password: 'Superguy123',
  passwordConfirmation: 'Superguy123',
}
export const loginPayload = {
  email: 'mantis@gmail.com',
  password: 'Superguy123',
}

describe('user', () => {
  beforeAll(async () => {
    await connectDBForTesting()
  })

  afterAll(async () => {
    await UserModel.collection.drop()
    await disconnectDBForTesting()
  })

  describe('given the user is not logged in', () => {
    it('should return a 401', async () => {
      const { statusCode } = await agent
        .post('/api/products')
        .send(productPayload)

      expect(statusCode).toBe(401)
    })
  })

  describe('given the user is logged in', () => {
    it('should return a 200 and register the user', async () => {
      const { statusCode, body } = await agent
        .post('/api/users')
        .send(userPayload)

      expect(statusCode).toBe(201)

      expect(body).toEqual({
        _id: expect.any(String),
        firstName: 'michael',
        lastName: 'Van Daele',
        email: 'mantis@gmail.com',

        /* __v: 0,
        _id: expect.any(String),
        createdAt: expect.any(String),
        productId: expect.any(String),
        updatedAt: expect.any(String),
        user: expect.any(String),*/
      })
    })

    it('should return a 200 and login the user', async () => {
      const { statusCode, body, headers } = await agent
        .post('/api/sessions')

        .send(loginPayload)
      token = body.accessToken
      response = headers
      userId = body.user

      expect(statusCode).toBe(200)

      expect(body).toEqual({
        accessToken: expect.any(String),

        refreshToken: expect.any(String),
      })
    })

    it('should return a 200 and get session of the user', async () => {
      const { statusCode, body } = await agent
        .get('/api/sessions')
        .set('Cookie', [...response['set-cookie']])
        .set('Authorization', `Bearer ${token}`)

      //const sessions = await findSessions({ user: userId, valid: true })

      const gh = `
 console.log('yyyyyyyyy,${JSON.stringify(body)}');
`
      const yy = parseWithComments(gh)
      console.log(yy)

      expect(statusCode).toBe(200)
      expect(body[0]).toEqual({
        __v: expect.any(Number),
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: expect.any(String),
        userAgent: expect.any(String),
        valid: true,
      })
    })
    it('should return a 200 and delete session of the user', async () => {
      const { statusCode, body } = await agent
        .get('/api/sessions')
        .set('Cookie', [...response['set-cookie']])
        .set('Authorization', `Bearer ${token}`)

      //const sessions = await findSessions({ user: userId, valid: true })

      expect(statusCode).toBe(200)

      token = ''
    })
  })
})
