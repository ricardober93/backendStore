import Product from "../models/ProductModel";
import Brand from "../models/BrandModel";
import Category from "../models/CategoryModel";
import {
  MessageResponse
} from "../../../helpers/messageResponse";

/**
 * getProducts
 *
 * @export
 * @return {object} 
 */
export async function getProductsService() {

  const products = await Product.find().populate('brand').populate('category');
  if (!products) {
    throw (MessageResponse.notFound())
  }
  return products

}

/**
 * getProductsRandomService
 *
 * @export
 * @return {object} 
 */
export async function getProductsRandomService() {

  let count = await Product.count()
  let random = Math.floor(Math.random() * count)

  const products = await Product.find().limit(10).skip(random).populate('brand').populate('category');

  if (!products) {
    throw (MessageResponse.notFound())
  }

  return products

}
/**
 * getProduct
 *
 * @export
 * @param {string} id
 * @return {object} 
 */
export async function getProductService(id) {

  const product = await Product.findById(id).populate('brand').populate('category');

  if (!product) {
    throw (MessageResponse.notFound())
  }

  return product

}

exports.createProduct = async (
  name,
  description,
  price,
  featured,
  image_preview,
  image = [],
  raiting = 5,
  SKU,
  stock = 1,
  brand_id,
  category_id,
  state = 'disponible',
  publish = true
) => {

  const brand = await Brand.findById(brand_id)
  const category = await Category.findById(category_id)

  const NewProduct = new Product({
    name,
    description,
    price,
    featured,
    image_preview,
    image,
    raiting,
    SKU,
    stock,
    brand,
    category,
    state,
    publish
  });

  const result = await NewProduct.save();

  return result;
};

exports.updateProduct = async (
  id,
  name,
  description,
  price,
  featured,
  image_preview,
  image = [],
  raiting = 5,
  SKU,
  stock = 1,
  brand_id,
  category_id,
  state = 'disponible',
  publish = true
) => {


  const brand = await Brand.findById(brand_id)
  const category = await Category.findById(category_id)

  const result = await Product.findByIdAndUpdate(id, {
    name,
    description,
    price,
    featured,
    image_preview,
    image,
    raiting,
    SKU,
    stock,
    brand,
    category,
    state,
    publish
  });

  return result;

};

exports.deleteProduct = async (id) => {
  const result = await Product.findByIdAndRemove(id);
  return result;
}

export async function getProductsBySearchService(search) {

  let products = await Product.find().populate(['category', 'brand'])

  products = await products.filter(product => product.name.toLowerCase().indexOf(search) !== -1)

  if (!products) {
    throw (MessageResponse.notFound())
  }

  return products

}