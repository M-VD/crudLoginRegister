import bcrypt from 'bcrypt'
import config from 'config'
import { nanoid } from 'nanoid'
import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  pre,
  DocumentType,
  index,
} from '@typegoose/typegoose'
import log from '../utils/logger'

/*export const privateFields = ['password', '__v']
/* "verificationCode",
  "passwordResetCode",
  "verified",/*
@pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))

  const hash = await bcrypt.hashSync(this.password, salt)

  this.password = hash

  return next()
})*/
@index({ email: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string

  @prop({ required: true })
  firstName: string

  @prop({ required: true })
  lastName: string

  @prop({ required: true })
  password: string

  @prop()
  createdAt: Date

  @prop()
  updatedAt: Date
  /*
  @prop({ required: true, default: () => nanoid() })
  verificationCode: string

  @prop({ default: false })
  verified: boolean
*/

  // @prop()
  // passwordResetCode: string | null
  /*
  async comparePassword(
    this: DocumentType<User>,
    candidatePassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(candidatePassword, this.password)
    } catch (e) {
      log.error(e, 'Could not validate password')
      return false
    }
  }*/
}

const UserModel = getModelForClass(User)

export default UserModel
