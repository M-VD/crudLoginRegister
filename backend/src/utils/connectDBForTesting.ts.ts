import mongoose from 'mongoose'

export async function connectDBForTesting() {
  try {
    const dbUri =
      'mongodb+srv://mich:test@cluster0.jiais.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'testing'
    await mongoose.connect(dbUri, {
      dbName,
      autoCreate: true,
    })
  } catch (error) {
    console.log('DB connect error')
  }
}

export async function disconnectDBForTesting() {
  try {
    await mongoose.connection.close()
  } catch (error) {
    console.log('DB disconnect error')
  }
}
