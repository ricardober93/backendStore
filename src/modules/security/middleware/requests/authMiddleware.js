const {
    param,
    check,
 } = require('express-validator');
 import User from '../../models/UserModel'
 import {
    requestValidate
 } from '../../../middleware/requestValidate';
 import {
    MessageValidator
 } from '../../../../helpers/messageValidator';
 import { MessageResponse } from '../../../../helpers/messageResponse';
 import bcryptjs from 'bcryptjs';
 
 export const authActionMiddleware = requestValidate([
 
    check('email')
       .exists()
       .withMessage(MessageValidator.isRequired('email'))
       .isLength({
          min: 5,
          max: 50
       })
       .withMessage(MessageValidator.betweenLength('email', 5, 50))
       .isEmail()
       .bail()
       .custom(async (email, req) => {
         const body = req.req.body;
         const user = await User.findOne({
            email: body.email
         })
         
         if (!user) {
            return Promise.reject('El email no existe');
         }
      }),
 
    check('password')
       .exists()
       .withMessage(MessageValidator.isRequired('password'))
       .isLength({
          min: 6
       })
       .withMessage(MessageValidator.minLength('password', 6))
       .bail()
       .custom(async (email, req) => {
         const body = req.req.body;
         const user = await User.findOne({
            email: body.email
         })
         const validPassword = bcryptjs.compareSync(body.password, user.password);
         if (!validPassword) {
            return Promise.reject('The email or password is invalid');
         }
      })
 
 ]);