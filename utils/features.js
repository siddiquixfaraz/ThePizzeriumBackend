import jwt from "jsonwebtoken"

export const sendCookie =( res,User, statusCode, message)=>{
    const token = jwt.sign({_id: User._id}, process.env.SECRET_CODE)

    res.status(statusCode)
    .cookie("token",token,{
        httpOnly: true,
        maxAge: 15*60*1000,
    })
    .json({
        success: true,
        message
    })
}