import { Response } from "express"

const customMessages = {
  200: "Success",
  201: "Created",
  400: "Bad request",
  401: "Unauthorized",
  404: "Not found",
  500: "Server error",
}
const sendResponse = ({ status = 200, message, res, data }: SendResponsePayload) => {
  const statusMessage = status.toString().startsWith("2") ? "success" : "error"

  res.status(status).json({
    code: statusMessage === "success" ? 0 : 1,
    message: message || customMessages[status as keyof typeof customMessages] ||  statusMessage,
    data,
  })
}

type SendResponsePayload = { res: Response; status?: 200 | 201 | 404 | 500 | number; message?: string; data?: any }

export default sendResponse
