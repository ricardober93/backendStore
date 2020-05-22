import Customization from "../models/CustomizationModel";
import fs from 'fs-extra';
import path from 'path';
import randomString from "../utils/randomString";
import sizeOf from 'image-size'

export function readCustomizationService () {
    return Customization.findOne()
        .then(customization => {
            customization.logo = process.env.URL_BACKEND+'/'+customization.logo;
            return customization;
        })
        .catch(error => {
            return false;
        })
}

export async function updateColorsService(colorPrimary, colorSecondary, textPrimary, textSecondary) {

    const colors = await Customization.updateOne({
        color_primary: colorPrimary,
        color_secondary: colorSecondary,
        text_primary: textPrimary,
        text_secondary: textSecondary
    }) 

    if(!colors){
       throw new Error('Los colores no existen')
    }

    return colors;
}

export async function updateLanguageService(language) {

    const currentLanguage = await Customization.updateOne({
        language: language
    }) 

    if(!currentLanguage){
       throw new Error('El lenguage no existe')
    }

    return currentLanguage;
}

export const changeLogoPreview = async function(username, filepath, originalname, size, logo_title, logo_mode){
    //Reemplaza la imagen de vista previa
    const customizationRemove = await getCustomization()
    if (customizationRemove.logo_preview){
        try {
            fs.statSync(customizationRemove.logo_preview);
                await fs.unlink(customizationRemove.logo_preview);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
            console.log('file or directory does not exist');
            }
        }
    }
    if(filepath && originalname && logo_mode){
        const imgUrl = randomString();
        const imageTempPath = filepath;
        const ext = path.extname(originalname).toLowerCase();
        const targetPath = path.resolve(`assets/logoPreview/${username}_${imgUrl}${ext}`);
        const dimensions = sizeOf(imageTempPath);
        // Validate Extension
        if ((ext === '.png' || ext === '.jpg' || ext === '.jpeg') || size <= 2000000 || dimensions.height <= 500 || dimensions.width <= 500 ){

            const logo_preview =  `assets/logoPreview/${username}_${imgUrl}${ext}`
            //const updateLogo = await Customization.updateOne({ logo });
            const updateLogo = await Customization.updateMany({}, {logo_preview, logo_title, logo_mode});

            if(!updateLogo){
                return { state:false, msg: "Error en la base de datos" } 
            }
            await fs.rename(imageTempPath, targetPath);
            return {logo_preview, logo_mode, logo_title};
        
        }else {
            // you wil need the public/temp path or this will throw an error
            await fs.unlink(imageTempPath);
            return { state:false, msg: "La imagen no cumple los requerimientos (tamaño menor a 2Mb, extension .png, jpeg o jpg) y/o resolucion 500 * 500"}
        }
    } else if(logo_title && logo_mode){
        const updateLogo = await Customization.updateMany({}, { logo_preview : '', logo_title, logo_mode });
        if(!updateLogo){
            return { state:false, msg: "Error en la base de datos" } 
        } else {
            return {logo_preview : '', logo_title, logo_mode};
        }
    } else {
        return { state:false, msg: "Se requiere al menos un título o un archivo para logo"}
    }
}

export const changeLogo = async function(username, filepath, originalname, size, logo_title, logo_mode) {
    
    //elimina imagen de logo antigua
    const customizationRemove = await getCustomization()
    if (customizationRemove.logo){
        try {
            fs.statSync(customizationRemove.logo);
                await fs.unlink(customizationRemove.logo);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
            console.log('file or directory does not exist');
            }
        }
    }
    if(filepath && originalname && logo_mode){
        const imgUrl = randomString();
        const imageTempPath = filepath;
        const ext = path.extname(originalname).toLowerCase();
        const targetPath = path.resolve(`assets/logo/${username}_${imgUrl}${ext}`);
        const dimensions = sizeOf(imageTempPath);
        // Validate Extension
        if ((ext === '.png' || ext === '.jpg' || ext === '.jpeg') || size <= 2000000 || dimensions.height <= 500 || dimensions.width <= 500 ){

            const logo =  `assets/logo/${username}_${imgUrl}${ext}`
            //const updateLogo = await Customization.updateOne({ logo });
            const updateLogo = await Customization.updateMany({}, {logo, logo_title, logo_mode});

            if(!updateLogo){
                return { state:false, msg: "Error en la base de datos" } 
            }
            await fs.rename(imageTempPath, targetPath);
            return {logo, logo_mode, logo_title};
        
        }else {
            // you wil need the public/temp path or this will throw an error
            await fs.unlink(imageTempPath);
            return { state:false, msg: "La imagen no cumple los requerimientos (tamaño menor a 2Mb, extension .png, jpeg o jpg) y/o resolucion 500 * 500"}
        }
    } else if(logo_title && logo_mode){
        const updateLogo = await Customization.updateMany({}, { logo : '', logo_title, logo_mode });
        if(!updateLogo){
            return { state:false, msg: "Error en la base de datos" } 
        } else {
            return {logo : '', logo_title, logo_mode};
        }
    } else {
        return { state:false, msg: "Se requiere al menos un título o un archivo para logo"}
    }
};


function getCustomization(){
    return Customization.findOne()
        .then(customization => {
            return customization;
        })
        .catch(error => {
            return false;
        })
}