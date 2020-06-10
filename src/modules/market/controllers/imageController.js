import { logRequest } from '../../logger/logger';
import {   
    getImages,
    addImages,
    deleteImages
} from '../services/ImagesService';



module.exports.getImagesAction = async (req, res, next ) =>{
    logRequest(req)

    const { id } = req.user;
    let response = {
        errors: [],
        msg: '',
        data: {},
    }

    let images = await getImages(id)

    if (!images) {
        response.msg = 'No tienes fotos agregas a este producto.'
        return res.status(400).json(response)
    }

    response.data = images
    res.json(response)
}


module.exports.addImagesAction = async (req, res, next ) =>{
    logRequest(req)
    const { images, user_id } = req.body;
    let response = {
        errors: [],
        msg: '',
        data: {},
    }
    const images = await addImages(images, user_id);

    if (!images) {
        response.msg = 'Ha ocurrido un problema con la carga de las imagenes'
        return res.status(500).json(response)
    }

    let result = await images.save()

    response.data = result
    return res.status(200).json(response)
}

module.exports.deleteImagesAction = async (req, res, next) => {
    logRequest(req)
    const { imagesId , index} = req.body;
    let response = {
        errors: [],
        msg: '',
        data: {},
    }
    let images = await deleteImages(imagesId , index)

    if (!images) {
        response.msg = 'El Imagen no se puede eliminar'
        response.errors = new Error
        res.status(500).json(response)
    }

    response.data = images
    res.status(200).json(response)
}