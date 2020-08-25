import Cart from "../models/CartModel";
import User from "../../security/models/UserModel";
const mercadopago = require ('mercadopago');

export async function readCarts () {

    let carts = await Cart.find().populate('user')
    
    return carts

}

export async function addCart (products, total, total_discount = 0, user_id) {

    let user = await User.findById(user_id)

    const cart = new Cart({
        products: products,
        total_price: total,
        total_discount: total_discount,
        order_date: Date.now(),
        state: 'pending',
        user: user ? user : null,
    });
    
    cart.id = cart._id;
    await cart.save()

    return cart;
}

export async function paymentMercadoPago (products, form_mp, user_id, cart_id) {

    // Agrega credenciales
    mercadopago.configure({
        access_token: 'TEST-8876112950783580-072719-b93d599dafda7b8e535584359c8548ef-143861807'
    });

    let items = []
    let cartUpdate;

    products.map( product => {
        let item = {
            id: product._id,
            title: product.name,
            currency_id: 'ARS',
            unit_price: product.price,
            quantity: product.quantity,
        } 
        items.push(item)
    })

    // Crea un objeto de preferencia
    let preference = {
        items: items
    };
    
    await mercadopago.preferences.create(preference)
    .then( async function(response){
        // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        global.id = response.body.user_id;
        cartUpdate = await Cart.findByIdAndUpdate(cart_id, {
            state: 'payed',
        }) 
    }).catch(async function(error){
        console.error(error);
        cartUpdate = await Cart.findByIdAndUpdate(cart_id, {
            state: 'cancel',
        }) 
    });

    cartUpdate = await Cart.findById(cart_id).populate('user')

    return cartUpdate;
}

export async function getCart (id) {
    
    const cart = await Cart.findById(id).populate('user')

    if(!cart){
        throw new Error('El carrito con ese ID no existe')
    }  

    return cart;
}

export async function getCartByUser (user_id) {
    
    const cart = await Cart.find({ user: user_id })

    if(!cart){
        throw new Error('El carrito con ese ID no existe')
    }  

    return cart;
}

export async function updateCart (id,total_discount,total_price,state,user_id)  {

    let user = User.findById(user_id).populate('user')
    
    const cart = await Cart.findByIdAndUpdate(id, {
        total_discount: total_discount,
        total_price: total_price,
        order_date: Date.now(),
        state: state,
        user: user,
    }) 

    if(!cart){
       throw new Error('El carrito con ese ID no existe')
    }

    const cartUpdate = await User.findById(id).populate('user')

    if(!cartUpdate){
        throw new Error('Hubo un error al encontrar el carrito')
    }

    return cartUpdate;
}