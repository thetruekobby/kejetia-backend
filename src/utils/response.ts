import { Response } from "express"
const sendResponse = ({ status=200, message , res, data }: SendResponsePayload) => {
  const statusMessage = status.toString().startsWith("2") ? "success" : "error"

  res.status(200).json({
    code: statusMessage === "success" ? 0 : 1,
    message: message || statusMessage,
    data,
  })
}

type SendResponsePayload = { res: Response; status?: 200 | 201 | 404 | 500 | number; message?: string; data?: any }

export default sendResponse
