import bcrypt from "bcrypt"

const saltRounds = 10

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds)
}
export const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash)
