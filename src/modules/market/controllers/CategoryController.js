import { logRequest } from '../../logger/logger';
import {   
    readCategories,
    addCategory,
    getCategory,
    updateCategory
} from '../services/CategoryService';
import { validationResult } from "express-validator";
import {
    createResponseFormat
} from '../../../helpers/responseFormat'
import {
    MessageResponse
} from '../../../helpers/messageResponse'
let response = createResponseFormat()


module.exports.readCategoriesAction = async function (req, res) {

    logRequest(req)

    /* if (!req.user) {
        response.msg = 'No autorizado'
        return res.status(401).json(response)
    } */

    const categories = await readCategories();
    
    try {
        response.data = categories
        return res.status(200).json(response);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
}

module.exports.addCategoryAction = async function (req, res) {

    logRequest(req)

    const { name, description, image_url, featured, state } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.errors = errors.array()
        response.message = 'La petición no fue exitosa'
        res.status(400).json(response) 
    }
    
    try {
        const category = await addCategory(name, description, image_url, featured, state);
        const result = await category.save();

        response.data = result
        res.status(201).json(response)
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}

module.exports.getCategoryAction = async function (req, res) {

    logRequest(req)

    /*let response = {
        errors: [],
        msg: '',
        data: {},
    }*/

    const category = await getCategory(req.params.id);

    /*if (!category){
        response.msg = 'No hemos encontrado un usuario con ese ID'
        return res.status(404).json(response);
    }*/
    try {
        response.data = category;
        res.status(200).json(response);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(400).send(response)
    }
}

module.exports.updateCategoryAction = async function (req, res) {

    logRequest(req)
    
    const { name, description, image_url, featured, state } = req.body;

    try{
        const categoryUpdate = await updateCategory(req.params.id, name, description, image_url, featured, state);
        response.data = categoryUpdate
        res.status(200).json(response)
    }
    catch(error){
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}
