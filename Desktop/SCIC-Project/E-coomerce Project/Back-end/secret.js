require('dotenv').config()
const port = process.env.PORT || 3000
const mongoURL = process.env.MONGODB_URL || "mongodb://localhost:27017/E-commerceDB"
const defaultImagePath = process.env.DEFAULT_IMAGE_PATH || './public/images/users/thumbnail.png'
const secret = process.env.JWT_SECRET_KEY || 'aisukjsdnjaheri34i934i34922323'
module.exports = {port,mongoURL,defaultImagePath,secret}