import jwt, { JwtPayload } from "jsonwebtoken"
export const createToken = (payload: any) => {
  try {
    return jwt.sign(payload, process.env.SECRET as string, { expiresIn: "1d" })
  } catch (error) {
    return null
  }
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.SECRET as string) as DecodedToken
  } catch (error) {
    return null
  }
}


export interface DecodedToken extends JwtPayload {
  email: string
  id: string
}