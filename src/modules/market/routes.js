//const express = require('express');
import express from 'express'
import {
    readCategoriesAction, 
    addCategoryAction,
    getCategoryAction,
    updateCategoryAction
} from './controllers/CategoryController'
import {
    readBrandsAction, 
    addBrandAction,
    getBrandAction,
    updateBrandAction
} from './controllers/BrandController'
import {
    readCartsAction, 
    addCartAction,
    getCartAction,
    getCartByUserAction,
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
router.get('/api/categories', readCategoriesAction);
//Agregar una categoria
router.post('/api/category', addCategoryAction);
//Encontrar una categoria
router.get('/api/category/:id', getCategoryAction);
//Actualizar una categoria
router.put('/api/category/:id', updateCategoryAction);

//BRANDS
//Retorna todas las marcas
router.get('/api/brands', readBrandsAction);
//Agregar una marca
router.post('/api/brand', addBrandAction);
//Encontrar una marca
router.get('/api/brand/:id', getBrandAction);
//Actualizar una marca
router.put('/api/brand/:id', updateBrandAction);

//CART
//Retorna todas los carritos
router.get('/api/carts', readCartsAction);
//Agregar un carrito
router.post('/api/cart', addCartAction);
//Encontrar un carrito por usuario
router.get('/api/carts/user', getCartByUserAction);
//Encontrar un carrito
router.get('/api/cart/:id', getCartAction);
//Actualizar un carrito
router.put('/api/cart/:id', updateCartAction);

//PRODUCT
//Retorna todas los productos
router.get('/api/products', getProductsAction);
//Retorna un producto por id
router.get('/api/product/:id', getProductAction);
//Agregar un producto
router.post('/api/product', createProductAction);
//Actualizar un producto
router.put('/api/product/:id', editProductAction);
//Eliminar un carrito
router.delete('/api/product/:id', deleteProductAction);

export default router;