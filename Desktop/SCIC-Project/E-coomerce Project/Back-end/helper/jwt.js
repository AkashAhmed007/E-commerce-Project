const jwt = require('jsonwebtoken')
const createJsonWebToken = (payload,secretKey,expiresIn)=>{
    if(typeof payload !== 'object' || !payload){
        throw new Error('Payload must be a non empty object')
    }
    if(typeof secretKey !== 'string' || secretKey === ''){
        throw new Error('secretKey must be a non empty string')
    }
    
    try {
        const token = jwt.sign(payload,secretKey,{
            expiresIn:expiresIn
        })
        return token;
    } catch (error) {
        console.error('failed to sign in jwt token', error)
        throw error;
    }
}
module.exports = {createJsonWebToken};