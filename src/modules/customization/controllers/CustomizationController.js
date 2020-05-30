import { logRequest } from '../../logger/logger';
import { validationResult } from "express-validator";
import { readCustomizationService, updateColorsService, updateLanguageService, changeLogo, changeLogoPreview} from '../services/CustomizationService';

module.exports.readCustomizationAction = async function (req, res) {

    logRequest(req)

    let response = {
        errors: [],
        message: '',
        data: {},
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.errors = errors.array()
        response.message = 'La petición no fue exitosa'
        return res.status(400).json(response) 
    }

    const customization = await readCustomizationService()

    if (customization) {
        return res.status(200).json(customization);
    } else {
        return res.status(400).send(response)
    }
}

module.exports.updateColorsAction = async function (req, res) {
    //1. Logueamos la request
    logRequest(req)

    let response = {
        errors: [],
        message: '',
        data: {},
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.errors = errors.array()
        response.message = 'La petición no fue exitosa'
        return res.status(400).json(response) 
    }

    //2. Verificamos autenticacion y autorizacion
    if (!req.user || !req.rbac.isAllowed(req.user.id, "LIST_ROLES_PERMISSION")){
        response.message = 'No autorizado'
        res.status(401).send(response)
    }

    if(!req.body.color_primary || !req.body.color_secondary || !req.body.text_primary || !req.body.text_secondary) {
        response.message = 'Los parametros son inconsistentes'
        res.status(400).send(response)
    }

    try {
        //3. Consumo un servicio que me brinda la data que necesitamos
        const colorUpdate = await updateColorsService(req.body.color_primary, req.body.color_secondary, req.body.text_primary, req.body.text_secondary)
        //4. Brindo una RESPONSE a la consulta
        if (colorUpdate) {
            response.message = 'El color fue editado con exito';
            return res.status(200).json(response);
        } else {
            return res.status(400).send(response)
        }
    } catch (error) {
        console.log(error);
    }
    
}

module.exports.updateLanguageAction = async function (req, res) {
    //1. Logueamos la request
    logRequest(req)

    let response = {
        errors: [],
        message: '',
        data: {},
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.errors = errors.array()
        response.message = 'La petición no fue exitosa'
        return res.status(400).json(response) 
    }

    //2. Verificamos autenticacion y autorizacion
    if (!req.user || !req.rbac.isAllowed(req.user.id, "LIST_ROLES_PERMISSION")){
        response.message = 'No autorizado'
        res.status(401).send(response)
    }

    if(!req.body.language) {
        response.message = 'Los parametros son inconsistentes'
        res.status(400).send(response)
    }

    try {
        //3. Consumo un servicio que me brinda la data que necesitamos
        const languageUpdate = await updateLanguageService(req.body.language)

        //4. Brindo una RESPONSE a la consulta
        if (languageUpdate) {
            response.message = 'El lenguaje fue editado con exito';
            return res.status(200).json(response);
        } else {
            return res.status(400).send(response)
        }
    } catch (error) {
        console.log(error);
    }
    
}

module.exports.changeLogoPreviewAction = async function (req, res) {
    var urlBackend = process.env.URL_BACKEND.concat('/')

    logRequest(req)

    let response = {
        errors: [],
        message: '',
        data: {},
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response[0].errors = errors.array()
        response[0].message = 'La petición no fue exitosa'
        return res.status(400).json(response) 
    }
    
    let logoService;
    try {
        logoService = await changeLogoPreview(req.user.role.name, req.file.path, req.file.originalname, req.file.size, req.body.logo_title, req.body.logo_mode);
    } catch(error) {
        logoService = await changeLogoPreview(req.user.role.name,'','','', req.body.logo_title, req.body.logo_mode);
    }
   
    if (logoService.logo_preview || logoService.logo_title) {
        //response[0].data = logo;
        //response[0].message = "El Logo se modificó correctamente";
        const logo = urlBackend.concat(logoService.logo_preview);
        const logo_title = logoService.logo_title;
        const logo_mode = logoService.logo_mode;
        return res.status(200).json({logo, logo_title, logo_mode});
    } else {
        //response[0].message = "El Logo no se pudo modificar correctamente";
        response.message = logoService.msg;
        return res.status(400).json(response);
    }
}
module.exports.updateLogoAction = async function (req, res) {
    var urlBackend = process.env.URL_BACKEND.concat('/')
    
    logRequest(req)

    let response = {
        errors: [],
        message: '',
        data: {},
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response[0].errors = errors.array()
        response[0].message = 'La petición no fue exitosa'
        return res.status(400).json(response) 
    }
    
    let logoService;
    try {
        logoService = await changeLogo(req.user.role.name, req.file.path, req.file.originalname, req.file.size, req.body.logo_title, req.body.logo_mode);
    } catch(error) {
        logoService = await changeLogo(req.user.role.name,'','','', req.body.logo_title, req.body.logo_mode);
    }
  
    if (logoService.logo || logoService.logo_title) {
        //response[0].data = logo;
        //response[0].message = "El Logo se modificó correctamente";
        const logo = urlBackend.concat(logoService.logo);
        const logo_title = logoService.logo_title;
        const logo_mode = logoService.logo_mode;
        return res.status(200).json({logo, logo_title, logo_mode});
    } else {
        //response[0].message = "El Logo no se pudo modificar correctamente";
        response.message = logoService.msg;
        return res.status(400).json(response);
    }
}