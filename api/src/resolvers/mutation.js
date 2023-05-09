import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import gravatar from '../util/gravatar'
import dotenv from 'dotenv'

dotenv.config()

export const newNote = async (parent, args, { models }) => {
  return await models.Note.create({
    content: args.content,
    author: 'Adam Scott',
  })
}

export const deleteNote = async (parent, { id }, { models }) => {
  try {
    await models.Note.findOneAndRemove({ _id: id })
    return true
  } catch (err) {
    return false
  }
}

export const updateNote = async (parent, { content, id }, { models }) => {
  return await models.Note.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  )
}

export const signUp = async (
  parent,
  { username, email, password },
  { models }
) => {
  email = email.trim().toLowerCase()
  const hashed = await bcrypt.hash(password, 10)
  const avatar = gravatar(email)
  try {
    const user = await models.User.create({
      username,
      email,
      avatar,
      password: hashed,
    })

    return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  } catch (err) {
    throw new Error('Error creating account')
  }
}

export const signIn = async (
  parent,
  { username, email, password },
  { models }
) => {
  if (email) {
    email = email.trim().toLowerCase()
  }

  const user = await models.User.findOne({
    $or: [{ email }, { username }],
  })

  if (!user) {
    throw new AuthenticationError('Error signing in')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new AuthenticationError('Error signing in')
  }

  return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
}
