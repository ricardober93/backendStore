//const express = require('express');
import express from 'express';
import { readCustomizationAction, updateColorsAction, updateLanguageAction, updateLogoAction, changeLogoPreviewAction } from './controllers/CustomizationController';
import {multerI} from '../middleware/multer'

const router = express.Router();

router.get('/api/customization', readCustomizationAction);
router.put('/api/colors', updateColorsAction);
router.put('/api/language', updateLanguageAction);
router.post('/api/logo',multerI, updateLogoAction);
router.post('/api/logo-preview', multerI, changeLogoPreviewAction);

export default router