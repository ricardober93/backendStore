import nodemailer,{createTransport} from 'nodemailer'
require('dotenv').config()

const transport = createTransport({
     host: process.env.HOST_MAIL,
     port: process.env.PORT_MAIL,
     auth: {
       user: process.env.USER_MAIL,
       pass: process.env.PASS_MAIL
     }
});

export default {
  sendMail(from,to,subject,html){
    return new Promise((res,rej)=>{
      transport.sendMail({from,subject,to,html}, (err,info)=>{
        if(err) return rej(err)

        res(info)
      })
    })
}
}
