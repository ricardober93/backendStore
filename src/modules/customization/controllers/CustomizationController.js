import { logRequest, logError } from '../../logger/logger';
import { validationResult } from "express-validator";
import { readCustomizationService, updateColorsService, updateLanguageService, changeLogo, changeLogoPreview} from '../services/CustomizationService';
import {
    createResponseFormat
} from '../../../helpers/responseFormat'
let response = createResponseFormat()

module.exports.readCustomizationAction = async function (req, res) {

    logRequest(req)

    try {
        const customization = await readCustomizationService()

        return res.status(200).json(customization);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
}

module.exports.updateColorsAction = async function (req, res) {
    //1. Logueamos la request
    logRequest(req)

    let { color_primary, color_secondary, text_primary, text_secondary } = req.body

    try {
        const colorUpdate = await updateColorsService(color_primary, color_secondary, text_primary, text_secondary)
        
        response.data = colorUpdate;
        response.message = 'El color fue editado con exito';
        return res.status(200).json(response);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
    
}

module.exports.updateLanguageAction = async function (req, res) {

    logRequest(req)

    try {
        const languageUpdate = await updateLanguageService(req.body.language)

        response.message = 'El lenguaje fue editado con exito';
        return res.status(200).json(response);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
    
}

module.exports.changeLogoPreviewAction = async function (req, res) {

    var urlBackend = process.env.URL_BACKEND.concat('/')

    logRequest(req)

    let { path, originalname, size } = req.file
    let { logo_title, logo_mode } = req.body

    let logoService;

    try {
        logoService = await changeLogoPreview(req.user.role.name, path, originalname, size, logo_title, logo_mode);
    } catch(error) {
        logoService = await changeLogoPreview(req.user.role.name,'','','', logo_title, logo_mode);
    }
   
    try {
        if (logoService.logo_preview || logoService.logo_title) {
            //response[0].data = logo;
            //response[0].message = "El Logo se modificó correctamente";
            const logo = urlBackend.concat(logoService.logo_preview);
            const logoTitle = logoService.logo_title;
            const logoMode = logoService.logo_mode;
            return res.status(200).json({logo, logoTitle, logoMode});
        }
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}

module.exports.updateLogoAction = async function (req, res) {
    var urlBackend = process.env.URL_BACKEND.concat('/')
    
    logRequest(req)
    
    let { path, originalname, size } = req.file
    let { logo_title, logo_mode } = req.body

    let logoService;

    try {
        logoService = await changeLogo(req.user.role.name, path, originalname, size, logo_title, logo_mode);
    } catch(error) {
        logoService = await changeLogo(req.user.role.name,'','','', logo_title, logo_mode);
    }

    try {
        if (logoService.logo || logoService.logo_title) {
            //response[0].data = logo;
            //response[0].message = "El Logo se modificó correctamente";
            const logo = urlBackend.concat(logoService.logo);
            const logoTitle = logoService.logo_title;
            const logoMode = logoService.logo_mode;
            return res.status(200).json({logo, logoTitle, logoMode});
        }
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
}