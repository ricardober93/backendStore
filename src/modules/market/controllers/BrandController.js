import { logRequest } from '../../logger/logger';
import {   
    readBrands,
    addBrand,
    getBrand,
    updateBrand
} from '../services/BrandService';
import { validationResult } from "express-validator";

module.exports.readBrandsAction = async function (req, res) {

    logRequest(req)

    let response = {
        errors: [],
        msg: '',
        data: {},
    }
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.errors = errors.array()
        response.msg = 'La petición no fue exitosa'
        res.status(400).json(response) 
    }

    /* if (!req.user) {
        response.msg = 'No autorizado'
        return res.status(401).json(response)
    } */

    const categories = await readBrands();
    
    if (categories) {
        response.data = categories
        return res.status(200).json(response);
    } else {
        response.errors.push(true)
        return res.status(500).send(response)
    }
}

module.exports.addBrandAction = async function (req, res) {

    logRequest(req)

    const { name, description, image_url, featured, state } = req.body;

    let response = {
        errors: [],
        msg: '',
        data: {},
    }
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.errors = errors.array()
        response.msg = 'La petición no fue exitosa'
        res.status(400).json(response) 
    }
    
    const category = await addBrand(name, description, image_url, featured, state);
    const result = await category.save();

    response.data = result
    res.status(201).json(response)

}

module.exports.getBrandAction = async function (req, res) {

    logRequest(req)

    let response = {
        errors: [],
        msg: '',
        data: {},
    }

    const category = await getBrand(req.params.id);

    if (!category){
        response.msg = 'No hemos encontrado un usuario con ese ID'
        return res.status(404).json(response);
    }

    response.data = category
    res.json(response)

}

module.exports.updateBrandAction = async function (req, res) {

    logRequest(req)
    
    const { name, description, image_url, featured, state } = req.body;

    let response = {
        errors: [],
        msg: '',
        data: {},
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.errors = errors.array()
        response.msg = 'La petición no fue exitosa'
        res.status(400).json(response) 
    }

    try{
        const categoryUpdate = await updateBrand(req.params.id, name, description, image_url, featured, state);
        response.data = categoryUpdate
        res.status(200).json(response)
    }
    catch(error){
        response.msg = error.message
        res.status(500).json(response) 
    }

}
