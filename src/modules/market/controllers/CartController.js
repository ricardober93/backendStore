import {
    readCarts,
    addCart,
    getCart,
    getCartByUser,
    updateCart,
    paymentMercadoPago
} from '../services/CartService';
import {
    MessageResponse
} from '../../../helpers/messageResponse'
import { logRequest, logError } from '../../logger/logger';

module.exports.readCartsAction = async function (req, res) {

    let response = logRequest(req)

    const carts = await readCarts();

    if (carts) {
        response.data = carts
        return res.status(200).json(response);
    } else {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }
}

module.exports.addCartAction = async function (req, res) {

    let response = logRequest(req)

    const { products, total, total_discount, form_mp } = req.body;

    try {

        const cart = await addCart(products, total, total_discount, req.user.id);
        //const mercadopago = await paymentMercadoPago(products, form_mp, req.user.id, cart._id);

        response.data = cart
        res.status(201).json(response)
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}

module.exports.getCartAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const cart = await getCart(req.params.id);

        response.data = cart
        res.json(response)

    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}

module.exports.getCartByUserAction = async function (req, res) {

    let response = logRequest(req)

    const { id } = req.user;
    try {
        const cart = await getCartByUser(id);

        if (!cart) {
            response.msg = 'No hemos encontrado un carrito con ese ID'
            return res.status(404).json(response);
        }

        response.data = cart
        res.json(response)
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}

module.exports.updateCartAction = async function (req, res) {

    let response = logRequest(req)

    const { total_discount, total_price, state, user_id } = req.body;

    try {

        const cartUpdate = await updateCart(req.params.id, total_discount, total_price, state, user_id);
        response.data = cartUpdate
        res.status(200).json(response)
    } catch (error) {
        response.errors.push(error)
        logError(req, error);
        return res.status(500).send(response)
    }

}
