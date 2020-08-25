import express from 'express';
import { readCustomizationAction, updateColorsAction, updateLanguageAction, updateLogoAction, changeLogoPreviewAction } from './controllers/CustomizationController';
import { multerI } from '../middleware/multer'
import { authToken } from '../middleware/auth'
import {
    updateColorsActionMiddleware,
    updateLanguageActionMiddleware,
} from './middleware/requests/customizationMiddleware'

const router = express.Router();

router.get('/api/customization', readCustomizationAction);
router.put('/api/colors', [authToken, updateColorsActionMiddleware], updateColorsAction);
router.put('/api/language', [authToken, updateLanguageActionMiddleware], updateLanguageAction);
router.post('/api/logo',[authToken, multerI], updateLogoAction);
router.post('/api/logo-preview', [authToken, multerI], changeLogoPreviewAction);

export default router