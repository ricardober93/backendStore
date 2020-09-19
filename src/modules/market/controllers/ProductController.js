import { logRequest, logError } from '../../logger/logger';
import { getProductsService, getProductsRandomService, getProductService, createProduct, updateProduct, deleteProduct, getProductsBySearchService } from '../services/ProductService'
import {
  MessageResponse
} from '../../../helpers/messageResponse'

// obtener todos los productos
exports.getProductsAction = async (req, res) => {

  let response = logRequest(req)

  try {
    const products = await getProductsService();

    response.data = products
    res.status(200).send(response);
  } catch (error) {
    response.errors.push(error);
    logError(req, error);
    res.status(500).send(response);
  }
};

// obtener todos los productos
exports.getProductsRandomAction = async (req, res, next) => {

  let response = logRequest(req)

  try {
    const products = await getProductsRandomService();

    response.data = products
    res.status(200).send(response);
  } catch (error) {
    response.errors.push(error);
    logError(req, error);
    res.status(500).send(response);
  }
};

// obtener un solo producto
exports.getProductAction = async (req, res, next) => {

  let response = logRequest(req)

  const id = req.params.id;

  try {
    const product = await getProductService(id);

    response.data = product
    res.status(200).send(response);
  } catch (error) {
    response.errors.push(error);
    logError(req, error);
    res.status(500).send(response);
  }
};

// crear un solo producto
exports.createProductAction = async (req, res, next) => {

  let response = logRequest(req)

  const {
    name,
    description,
    price,
    image_preview,
    image,
    featured,
    raiting,
    SKU,
    stock,
    brand_id,
    category_id,
    state,
    publish,
  } = req.body;

  try {

    let product = await createProduct(name, description, price, featured, image_preview, image, raiting, SKU, stock, brand_id, category_id, state, publish)
    response.msg = 'Product created succesfuly'
    response.data = product
    res.status(200).json(response)

  } catch (error) {
    response.errors.push(error);
    logError(req, error);
    res.status(500).send(response);
  }

};

// Editar un producto
exports.editProductAction = async (req, res, next) => {

  let response = logRequest(req)

  const id = req.params.id;

  const {
    name,
    description,
    price,
    featured,
    image_preview,
    image,
    raiting,
    sku,
    stock,
    brand_id,
    category_id,
    state,
    publish,
  } = req.body;

  try {
    let editProduct = await updateProduct(id, name, description, price, featured, image_preview, image, raiting, sku, stock, brand_id, category_id, state, publish)

    response.msg = 'Product update succesfuly'
    response.data = editProduct
    res.status(200).json(response)
  } catch (error) {
    response.errors.push(error);
    logError(req, error);
    res.status(500).send(response);
  }
};

// Eliminar producto
exports.deleteProductAction = async (req, res, next) => {

  let response = logRequest(req)

  const id = req.params.id;

  try {
    await deleteProduct(id);
    response.msg = 'Product deleted succesfuly'
    res.status(200).json(response)
  } catch (error) {
    response.errors.push(error);
    logError(req, error);
    res.status(500).send(response);
  }
};

// obtener todos los productos por busqueda
exports.getProductsBySearchAction = async (req, res, next) => {

  let response = logRequest(req)

  try {
    const products = await getProductsBySearchService(req.params.search);

    response.data = products;
    return res.status(200).json(response);
  } catch (error) {
    response.errors.push(error);
    logError(req, error);
    res.status(500).send(response);
  }
};
