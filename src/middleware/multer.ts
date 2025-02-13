import multer from "multer"

const storage = multer.memoryStorage()

export const upload = multer({ storage })
export const uploadSingle = multer({ storage }).single("file")
export const uploadMany = multer({ storage }).array("files")

