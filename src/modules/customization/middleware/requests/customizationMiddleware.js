const {
   param,
   check,
} = require('express-validator');
import User from '../../../security/models/UserModel'
import {
   requestValidate
} from '../../../middleware/requestValidate';
import {
   MessageValidator
} from '../../../../helpers/messageValidator';
import { MessageResponse } from '../../../../helpers/messageResponse';

//Validaciones del colors
export const updateColorsActionMiddleware = requestValidate([

   check('color_primary')
      .exists()
      .not()
      .isEmpty()
      .withMessage(MessageValidator.isRequired('color_primary'))
      .isLength({
         min: 3,
         max: 10
      })
      .withMessage(MessageValidator.betweenLength('color_primary', 3, 10)),

   check('color_secondary')
      .exists()
      .not()
      .isEmpty()
      .withMessage(MessageValidator.isRequired('color_secondary'))
      .isLength({
         min: 3,
         max: 10
      })
      .withMessage(MessageValidator.betweenLength('color_secondary', 3, 10)),

   check('text_primary')
      .exists()
      .not()
      .isEmpty()
      .withMessage(MessageValidator.isRequired('text_primary'))
      .isLength({
         min: 3,
         max: 10
      })
      .withMessage(MessageValidator.betweenLength('text_primary', 3, 10)),

   check('text_secondary')
      .exists()
      .not()
      .isEmpty()
      .withMessage(MessageValidator.isRequired('text_secondary'))
      .isLength({
         min: 3,
         max: 10
      })
      .withMessage(MessageValidator.betweenLength('text_secondary', 3, 10)),
   
]);

export const updateLanguageActionMiddleware = requestValidate([

   check('color_primary')
      .exists()
      .not()
      .isEmpty()
      .withMessage(MessageValidator.isRequired('color_primary'))
      .isLength({
         min: 3,
         max: 10
      })
      .withMessage(MessageValidator.betweenLength('color_primary', 3, 10)),

]);