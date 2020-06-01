export default {
     verifyUser: (secretToken,name,url)=>{
          const html = `<h3>Hola ${name}</h3>
               <br>
               Gracias por registrarte en ${url}
               <br>
               <b>Codigo de autenticacion</b>
               <br>
               <br>
               <b>${secretToken}</b>
               <br>
               <br>
               Ingresa en el siguiente link para verificar tu cuenta
               <br>
               <a href='${url}/auth/verify'><b>Verificar mi cuenta</a>

          `
          return html
     },
     changePassword: (name,urlToken)=>{
          const html = `<h3>Hola ${name}</h3>
               <br>
               Has solicitado cambiar tu contraseña
               <br>
               <b>Haz click en 'Cambiar Contraseña'</b>
               <br>
               <br>
               <a href='${urlToken}'><b>Cambiar contraseña</a>
               <br>
               <br>
               Ingresa en el siguiente link para cambiar tu contraseña
               <br>
               ¿No has sido tu? Simplemente ignora este mensaje
          `
          return html
     }
}