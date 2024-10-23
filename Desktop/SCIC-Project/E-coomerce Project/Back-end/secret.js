require('dotenv').config()
const port = process.env.PORT || 3000
const mongoURL = process.env.MONGODB_URL || "mongodb://localhost:27017/E-commerceDB"
const defaultImagePath = process.env.DEFAULT_IMAGE_PATH || './public/images/users/thumbnail.png'
module.exports = {port,mongoURL,defaultImagePath}