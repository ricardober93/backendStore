import { logRequest } from '../../logger/logger';
import {   
    readCarts,
    addCart,
    getCart,
    getCartByUser,
    updateCart
} from '../services/CartService';
import { validationResult } from "express-validator";

module.exports.readCartsAction = async function (req, res) {

    logRequest(req)
    
    console.log(req.user)

    let response = {
        errors: [],
        msg: '',
        data: {},
    }
    
    if (!req.user) {
        response.msg = 'No autorizado'
        return res.status(401).json(response)
    }

    const carts = await readCarts();
    
    if (carts) {
        response.data = carts
        return res.status(200).json(response);
    } else {
        response.errors.push(true)
        return res.status(500).send(response)
    }
}

module.exports.addCartAction = async function (req, res) {

    logRequest(req)

    const { products, total, total_discount, user_id } = req.body;

    let response = {
        errors: [],
        msg: '',
        data: {},
    }

    const cart = await addCart(products, total, total_discount, user_id);
    const result = await cart.save();

    try {
        response.data = result
        res.status(201).json(response)
    } catch (error) {
        response.msg = 'Error de servidor'
        res.status(500).json(response)
    }

}

module.exports.getCartAction = async function (req, res) {

    logRequest(req)

    let response = {
        errors: [],
        msg: '',
        data: {},
    }

    const cart = await getCart(req.params.id);

    if (!cart){
        response.msg = 'No hemos encontrado un carrito con ese ID'
        return res.status(404).json(response);
    }

    response.data = cart
    res.json(response)

}

module.exports.getCartByUserAction = async function (req, res) {

    logRequest(req)
    
    //const { id } = req.user;

    console.log(req)
    console.log(req.user)
    let id = '5f31c17726d1ad3e3390d07d'
    let response = {
        errors: [],
        msg: '',
        data: {},
    }

    const cart = await getCartByUser(id);

    if (!cart){
        response.msg = 'No hemos encontrado un carrito con ese ID'
        return res.status(404).json(response);
    }

    response.data = cart
    res.json(response)

}

module.exports.updateCartAction = async function (req, res) {

    logRequest(req)
    
    const { total_discount, total_price, state, user_id } = req.body;

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
        const cartUpdate = await updateCart(req.params.id, total_discount, total_price, state, user_id);
        response.data = cartUpdate
        res.status(200).json(response)
    }
    catch(error){
        response.msg = error.message
        res.status(500).json(response) 
    }

}
