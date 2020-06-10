import { logRequest } from '../../logger/logger';
import {   
    readBrands,
    addBrands,
    deleteBrands
} from '../services/BrandService';

module.exports.getBrandsAction = async (req, res, next ) =>{
    logRequest(req)

    let response = {
        errors: [],
        msg: '',
        data: {},
    }

    let brands = await readBrands()

    if (!brands) {
        response.msg = 'No existen marcas agregas a este producto.'
        return res.status(400).json(response)
    }

    response.data = brands
    return response
}

module.exports.addBrandsAction = async (req, res, next ) =>{
    logRequest(req)

    const { name } = req.body;

    let response = {
        errors: [],
        msg: '',
        data: {},
    }
    let brands = await addBrands(name)

    if (!brands) {
        response.msg = 'Hubo un problema en agregar la marca'
        return res.status(400).json(response)
    }
    let result = await brands.save()
    response.data = result
    res.json(response)
}

module.exports.deleteBrandsAction = async (req, res, next ) =>{
    logRequest(req)

    const { brandId } = req.body;

    let response = {
        errors: [],
        msg: '',
        data: {},
    }
    let brands = await deleteBrands(brandId)

    if (!brands) {
        response.msg = 'No se elimino la marca'
        return res.status(400).json(response)
    }

    response.msg = 'Marca eliminado'
    res.json(response)
}