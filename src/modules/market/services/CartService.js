import Cart from "../models/CartModel";
import User from "../../security/models/UserModel";

export async function readCarts () {

    let carts = Cart.find()
    if(!carts){
        throw new Error('Ocurrio un error al obtener los datos de los carritos')
    }
    return carts

}

export async function addCart (total_discount,total_price,state,user_id) {

    let user = User.findById(user_id)
    const cart = new Cart({
        total_discount: total_discount,
        total_price: total_price,
        order_date: Date.now(),
        state: state,
        user: user,
    });
    
    cart.id = cart._id;
    await cart.save()
    return cart;
}

export async function getCart (id) {
    
    const cart = await Cart.findById(id)

    if(!cart){
        throw new Error('El carrito con ese ID no existe')
    }  

    return cart;
}

export async function updateCart (id,total_discount,total_price,state,user_id)  {

    let user = User.findById(user_id)
    
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

    const cartUpdate = await User.findById(id)

    if(!cartUpdate){
        throw new Error('Hubo un error al encontrar el carrito')
    }

    return cartUpdate;
}