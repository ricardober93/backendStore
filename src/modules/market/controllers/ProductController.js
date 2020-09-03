import Product from "../models/ProductModel";
import Brand from "../models/BrandModel";
import { logRequest } from '../../logger/logger';
import { createProduct, updateProduct, deleteProduct, getProductsBySearchService } from '../services/ProductService'

// obtener todos los productos
exports.getProductsAction = async (req, res, next) => {

  logRequest(req)

  let response = {
    errors: [],
    msg: "",
    data: {},
  };

  try {
    const products = await Product.find().populate('brand').populate('category');
    response.msg = "La petición exitosa";
    response.data = products;
    res.status(200).json(response);
  } catch (error) {
    response.errors = true;
    response.msg = error;
    res.status(400).json(response);
    next();
  }
};

// obtener un solo producto
exports.getProductAction = async (req, res, next) => {
  
  logRequest(req)

  const id = req.params.id;
  let response = {
    errors: [],
    msg: "",
    data: {},
  };
  
  try {
    const product = await Product.findById(id).populate('brand').populate('category');
    response.msg = "get Product";
    response.data = product;
    res.status(200).json(response);
  } catch (error) {
    response.errors = true;
    response.msg = error;
    res.status(400).json(response);
    next();
  }
};

// crear un solo producto
exports.createProductAction = async (req, res, next) => {

  logRequest(req)

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

  let response = {
    errors: [],
    msg: "",
    data: {},
  };

  try {

      let product = await createProduct(name, description, price, featured, image_preview, image, raiting, SKU, stock, brand_id, category_id, state, publish)
      response.msg = 'Product created succesfuly'
      response.data = product
      res.status(200).json(response)
 
  } catch (error) {
    response.errors = true
    response.msg = error
    res.status(500).json(response)
    console.error(error)
    next(error)
  }

};

// Editar un producto
exports.editProductAction = async (req, res, next) => {

  logRequest(req)

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

  let response = {
    errors: [],
    msg: "",
    data: {},
  };

  try {
    let editProduct = await updateProduct(id, name, description, price, featured, image_preview, image, raiting, sku, stock, brand_id, category_id, state, publish)

    response.msg = 'Product update succesfuly'
    response.data = editProduct
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    response.errors = error;
    response.msg = error;
    res.status(500).json(response);
    next();
  }
};

// Eliminar producto
exports.deleteProductAction = async (req, res, next) => {

  logRequest(req)

  const id = req.params.id;
  let response = {
    errors: [],
    msg: "",
    data: {},
  };

  try {
    await deleteProduct(id);
    response.msg = 'Product deleted succesfuly'
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error);
    next();
  }
};

// obtener todos los productos por busqueda
exports.getProductsBySearchAction = async (req, res, next) => {

  logRequest(req)

  let response = {
    errors: [],
    message: "",
    data: {},
  };

  try {
    const products = await getProductsBySearchService(req.params.search);
    
    response.data = products;
    return res.status(200).json(response);
  } catch (error) {
    response.message = error;
    return res.status(500).json(response);
  }
};
