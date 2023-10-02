import bcrypt from 'bcrypt'

export const validatePassword = async (password: string, user: any) => {
  const match = await bcrypt.compare(password, user.password)

  return match
}
