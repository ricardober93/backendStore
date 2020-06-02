import Product from "../models/ProductModel";

exports.CreateProducto = async (
  name,
  description,
  price,
  image,
  raiting,
  SKU,
  comentaries,
  state,
  mark,
  publish
) => {

  const NewProduct = new Product({
    name,
    description,
    price,
    image,
    raiting,
    SKU,
    comentaries,
    state,
    mark,
    publish,
  });

  const  result =  await NewProduct.save();

  return result;
};
