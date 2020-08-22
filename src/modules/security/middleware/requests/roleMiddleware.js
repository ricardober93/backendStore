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
 
    check('name')
       .exists()
       .withMessage(MessageValidator.isRequired('name'))
       .isLength({
          min: 1,
          max: 50
       })
       .withMessage(MessageValidator.betweenLength('name', 1, 50))
       .isEmail(),
 
]);