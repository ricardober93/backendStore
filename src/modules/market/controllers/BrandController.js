import {
    readBrands,
    addBrand,
    getBrand,
    updateBrand
} from '../services/BrandService';
import {
    MessageResponse
} from '../../../helpers/messageResponse'
import { logRequest, logError } from '../../logger/logger';

module.exports.readBrandsAction = async function (req, res) {

    let response = logRequest(req)
    try {

        const categories = await readBrands();

        response.data = categories
        return res.status(200).json(response);
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
}

module.exports.addBrandAction = async function (req, res) {

    let response = logRequest(req)
    const { name, description, image_url, featured, state } = req.body;

    try {

        const category = await addBrand(name, description, image_url, featured, state);
        const result = await category.save();

        response.data = result
        res.status(201).json(response)
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
}

module.exports.getBrandAction = async function (req, res) {

    let response = logRequest(req)
    try {
        const category = await getBrand(req.params.id);

        response.data = category
        res.json(response)
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}

module.exports.updateBrandAction = async function (req, res) {

    let response = logRequest(req)

    const { name, description, image_url, featured, state } = req.body;

    try {
        const categoryUpdate = await updateBrand(req.params.id, name, description, image_url, featured, state);
        response.data = categoryUpdate
        res.status(200).json(response)
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}
