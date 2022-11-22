import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", {
    expiresIn: '1d',
  })
}
export default generateToken
