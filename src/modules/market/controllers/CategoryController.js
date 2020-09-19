import {
    readCategories,
    addCategory,
    getCategory,
    updateCategory
} from '../services/CategoryService';
import {
    MessageResponse
} from '../../../helpers/messageResponse'
import { logRequest, logError } from '../../logger/logger';


module.exports.readCategoriesAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const categories = await readCategories();

        response.data = categories
        return res.status(200).json(response);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
}

module.exports.addCategoryAction = async function (req, res) {

    let response = logRequest(req)

    const { name, description, image_url, featured, state } = req.body;

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

    let response = logRequest(req)

    try {
        const category = await getCategory(req.params.id);

        response.data = category;
        res.status(200).json(response);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
}

module.exports.updateCategoryAction = async function (req, res) {

    let response = logRequest(req)

    const { name, description, image_url, featured, state } = req.body;

    try {
        const categoryUpdate = await updateCategory(req.params.id, name, description, image_url, featured, state);
        response.data = categoryUpdate
        res.status(200).json(response)
    }
    catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}
