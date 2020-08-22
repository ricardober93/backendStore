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
 
 export const authActionMiddleware = requestValidate([
 
    check('email')
       .exists()
       .withMessage(MessageValidator.isRequired('email'))
       .isLength({
          min: 5,
          max: 50
       })
       .withMessage(MessageValidator.betweenLength('email', 5, 50))
       .isEmail(),
 
    check('password')
       .exists()
       .withMessage(MessageValidator.isRequired('password'))
       .isLength({
          min: 6
       })
       .withMessage(MessageValidator.minLength('password', 6))
 
 ]);