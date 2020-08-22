import Product from "../models/ProductModel";
import Brand from "../models/BrandModel";
import Category from "../models/CategoryModel";

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