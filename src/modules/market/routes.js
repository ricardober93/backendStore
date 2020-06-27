//const express = require('express');
import express from 'express'
import {
    readCategoriesAction, 
    addCategoryAction,
    getCategoryAction,
    updateCategoryAction
} from './controllers/CategoryController'
import {
    readCartsAction, 
    addCartAction,
    getCartAction,
    updateCartAction
} from './controllers/CartController'
import {
    getProductsAction, 
    getProductAction,
    createProductAction,
    editProductAction,
    deleteProductAction
} from "./controllers/ProductController";

const router = express.Router();

//CATEGORY
//Retorna todas las categorias
router.get('/categories/all', readCategoriesAction);
//Agregar una categoria
router.post('/category/add', addCategoryAction);
//Encontrar una categoria
router.get('/category/:id', getCategoryAction);
//Actualizar una categoria
router.put('/category/:id', updateCategoryAction);

//CART
//Retorna todas los carritos
router.get('/carts/all', readCartsAction);
//Agregar un carrito
router.post('/cart/add', addCartAction);
//Encontrar un carrito
router.get('/cart/:id', getCartAction);
//Actualizar un carrito
router.put('/cart/:id', updateCartAction);

//PRODUCT
//Retorna todas los productos
router.get('/products/all', getProductsAction);
//Retorna un producto por id
router.get('/product/:id', getProductAction);
//Agregar un producto
router.post('/product/add', createProductAction);
//Actualizar un producto
router.put('/product/:id', editProductAction);
//Eliminar un carrito
router.delete('/product/:id', deleteProductAction);

export default router;