import Brand from "../models/BrandModel";


export async function readBrands() {
    
    let brands = Brand.findById();

    return brands

}

export async function addBrands(name) {
    
    let brands = new Brand(
        name
    );

    return brands

}

export async function deleteBrands(brandId) {
    
    let brands = Brand.findByIdAndRemove(brandId);

    return brands

}