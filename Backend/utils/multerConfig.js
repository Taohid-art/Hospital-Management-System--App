import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, buffer) => {
      if (err) {
        return cb(err)
      }
      const uniqueName = buffer.toString('hex') + path.extname(file.originalname)
      cb(null, uniqueName)
    })
  
}})

const uploade = multer({ storage: storage })

export const upload = uploade