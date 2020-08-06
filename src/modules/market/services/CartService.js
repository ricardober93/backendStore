import Cart from "../models/CartModel";
import User from "../../security/models/UserModel";

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
        state: 'available',
        user: user ? user : null,
    });
    
    cart.id = cart._id;
    await cart.save()

    return cart;
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