import Customization from "../models/CustomizationModel";
import fs from 'fs-extra';
import path from 'path';
import randomString from "../utils/randomString";
import sizeOf from 'image-size'
import {
    MessageResponse
} from "../../../helpers/messageResponse";

/**
 * readCustomizationService
 *
 * @export
 * @return {object} 
 */
export function readCustomizationService() {
    return Customization.findOne()
        .then(customization => {
            customization.logo = process.env.URL_BACKEND + '/' + customization.logo;
            return customization;
        })
        .catch(error => {
            return false;
        })
}
/**
 * updateColorsService
 *
 * @param {string} colorPrimary
 * @param {string} colorSecondary
 * @param {string} textPrimary
 * @param {string} textSecondary
 * @return {object} 
 */
async function updateColorsService(colorPrimary, colorSecondary, textPrimary, textSecondary) {

    const colors = await Customization.updateOne({
        color_primary: colorPrimary,
        color_secondary: colorSecondary,
        text_primary: textPrimary,
        text_secondary: textSecondary
    })

    if (!colors) {
        throw (MessageResponse.notFound())
    }

    return colors;
}

/**
 * updateLanguageService
 *
 * @export
 * @param {string} language
 * @return {object} 
 */
export async function updateLanguageService(language) {

    const currentLanguage = await Customization.updateOne({
        language: language
    })

    if (!currentLanguage) {
        throw (MessageResponse.notFound())
    }

    return currentLanguage;
}

/**
 * changeLogoPreview
 *
 * @export
 * @param {string} username
 * @param {string} filepath
 * @param {string} originalname 
 * @param {string} size
 * @param {string} logo_title
 * @param {string} logo_mode
 * @return {object} 
 */
export const changeLogoPreview = async function (username, filepath, originalname, size, logo_title, logo_mode) {
    //Reemplaza la imagen de vista previa
    const customizationRemove = await getCustomization()
    if (customizationRemove.logo_preview) {
        try {
            fs.statSync(customizationRemove.logo_preview);
            await fs.unlink(customizationRemove.logo_preview);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                throw ('file or directory does not exist');
            }
        }
    }
    if (filepath && originalname && logo_mode) {
        const imgUrl = randomString();
        const imageTempPath = filepath;
        const ext = path.extname(originalname).toLowerCase();
        const targetPath = path.resolve(`assets/logoPreview/${username}_${imgUrl}${ext}`);
        const dimensions = sizeOf(imageTempPath);
        // Validate Extension
        if ((ext === '.png' || ext === '.jpg' || ext === '.jpeg') || size <= 2000000 || dimensions.height <= 500 || dimensions.width <= 500) {

            const logo_preview = `assets/logoPreview/${username}_${imgUrl}${ext}`
            //const updateLogo = await Customization.updateOne({ logo });
            const updateLogo = await Customization.updateMany({}, { logo_preview, logo_title, logo_mode });

            if (!updateLogo) {
                throw (MessageResponse.dbError())
            }
            await fs.rename(imageTempPath, targetPath);
            return { logo_preview, logo_mode, logo_title };

        } else {
            // you wil need the public/temp path or this will throw an error
            await fs.unlink(imageTempPath);
            return { state: false, msg: "La imagen no cumple los requerimientos (tamaño menor a 2Mb, extension .png, jpeg o jpg) y/o resolucion 500 * 500" }
        }
    } else if (logo_title && logo_mode) {
        const updateLogo = await Customization.updateMany({}, { logo_preview: '', logo_title, logo_mode });
        if (!updateLogo) {
            throw (MessageResponse.dbError())
        } else {
            return { logo_preview: '', logo_title, logo_mode };
        }
    } else {
        return { state: false, msg: "Se requiere al menos un título o un archivo para logo" }
    }
}

/**
 * changeLogo
 *
 * @export
 * @param {string} username
 * @param {string} filepath
 * @param {string} originalname 
 * @param {string} size
 * @param {string} logo_title
 * @param {string} logo_mode
 * @return {object} 
 */
export const changeLogo = async function (username, filepath, originalname, size, logo_title, logo_mode) {

    //elimina imagen de logo antigua
    const customizationRemove = await getCustomization()
    if (customizationRemove.logo) {
        try {
            fs.statSync(customizationRemove.logo);
            await fs.unlink(customizationRemove.logo);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                console.error('file or directory does not exist');
            }
        }
    }
    if (filepath && originalname && logo_mode) {
        const imgUrl = randomString();
        const imageTempPath = filepath;
        const ext = path.extname(originalname).toLowerCase();
        const targetPath = path.resolve(`assets/logo/${username}_${imgUrl}${ext}`);
        const dimensions = sizeOf(imageTempPath);
        // Validate Extension
        if ((ext === '.png' || ext === '.jpg' || ext === '.jpeg') || size <= 2000000 || dimensions.height <= 500 || dimensions.width <= 500) {

            const logo = `assets/logo/${username}_${imgUrl}${ext}`
            //const updateLogo = await Customization.updateOne({ logo });
            const updateLogo = await Customization.updateMany({}, { logo, logo_title, logo_mode });

            if (!updateLogo) {
                throw (MessageResponse.dbError())
            }
            await fs.rename(imageTempPath, targetPath);
            return { logo, logo_mode, logo_title };

        } else {
            // you wil need the public/temp path or this will throw an error
            await fs.unlink(imageTempPath);
            return { state: false, msg: "La imagen no cumple los requerimientos (tamaño menor a 2Mb, extension .png, jpeg o jpg) y/o resolucion 500 * 500" }
        }
    } else if (logo_title && logo_mode) {
        const updateLogo = await Customization.updateMany({}, { logo: '', logo_title, logo_mode });
        if (!updateLogo) {
            throw (MessageResponse.dbError())
        } else {
            return { logo: '', logo_title, logo_mode };
        }
    } else {
        return { state: false, msg: "Se requiere al menos un título o un archivo para logo" }
    }
};

/**
 * getCustomization
 *
 * @export
 * @return {object} 
 */
function getCustomization() {
    return Customization.findOne()
        .then(customization => {
            return customization;
        })
        .catch(error => {
            return false;
        })
}