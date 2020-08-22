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

//Validaciones al registrarse
export const signupActionMiddleware = requestValidate([

   check('name')
      .exists()
      .withMessage(MessageValidator.isRequired('name'))
      .isLength({
         min: 3,
         max: 50
      })
      .withMessage(MessageValidator.betweenLength('name', 3, 50)),

   check('lastname')
      .exists()
      .withMessage(MessageValidator.isRequired('lastname'))
      .isLength({
         min: 3,
         max: 50
      })
      .withMessage(MessageValidator.betweenLength('lastname', 3, 50)),

   check('email')
      .exists()
      .withMessage(MessageValidator.isRequired('email'))
      .isLength({
         min: 5,
         max: 50
      })
      .withMessage(MessageValidator.betweenLength('email', 5, 50))
      .isEmail()
      .withMessage(MessageValidator.mustBeOfType('email', 'email'))
      .bail()
      .custom((value, {
         req
      }) => {
         return new Promise((resolve, reject) => {
            User.findOne({
               email: req.body.email
            }, function (err, user) {
               if (err) {
                  reject(new Error(MessageResponse.generalError()))
               }
               if (Boolean(user)) {
                  reject(new Error(MessageValidator.inUse('email')))
               }
               resolve(true)
            });
         });
      }),

   check('password')
      .exists()
      .withMessage(MessageValidator.isRequired('password'))
      .isLength({
         min: 6,
         max: 30
      })
      .withMessage(MessageValidator.betweenLength('password', 6, 30)),

]);

//Validaciones del usuario
export const addUserActionMiddleware = requestValidate([
   check('name')
      .exists()
      .not()
      .isEmpty()
      .withMessage(MessageValidator.isRequired('name'))
      .isLength({
         min: 3,
         max: 50
      })
      .withMessage(MessageValidator.betweenLength('name', 3, 50)),

   check('email')
      .exists()
      .not()
      .isEmpty()
      .withMessage(MessageValidator.isRequired('email'))
      .isLength({
         min: 5,
         max: 50
      })
      .withMessage(MessageValidator.betweenLength('email', 5, 50))
      .isEmail()
      .withMessage(MessageValidator.mustBeOfType('email', 'email'))
      .bail()
      .custom((value, {
         req
      }) => {
         return new Promise((resolve, reject) => {
            User.findOne({
               email: req.body.email
            }, function (err, user) {
               if (err) {
                  reject(new Error(MessageResponse.generalError()))
               }
               if (Boolean(user)) {
                  reject(new Error(MessageValidator.inUse('email')))
               }
               resolve(true)
            });
         });
      }),

   check('password')
      .exists()
      .not()
      .isEmpty()
      .withMessage(MessageValidator.isRequired('password'))
      .isLength({
         min: 6,
         max: 30
      })
      .withMessage(MessageValidator.betweenLength('password', 6, 30)),

   check('role')
      .exists()
      .withMessage(MessageValidator.isRequired('role'))
]);