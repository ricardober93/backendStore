import Brand from "../models/BrandModel";

export async function readBrands () {

    let brand = Brand.find()
    if(!brand){
        throw new Error('Ocurrio un error al obtener los datos de la marca')
    }
    return brand

}

export async function addBrand (name,descrition,image_url,featured,state) {

    const brand = new Brand({
        name: name,
        descrition: descrition,
        image_url: image_url,
        featured: featured,
        state: state,
    });
    
    brand.id = brand._id;
    await brand.save()
    return brand;
}

export async function getBrand (id) {
    
    const brand = await Brand.findById(id)

    if(!brand){
        throw new Error('La marca con ese ID no esta')
    }  

    return brand;
}

export async function updateBrand (id,name,descrition,image_url,featured,state)  {

    const brand = await Brand.findByIdAndUpdate(id, {
        name: name,
        descrition: descrition,
        image_url: image_url,
        featured: featured,
        state: state,
    }) 

    if(!brand){
       throw new Error('La marca con ese ID no esta')
    }

    const brandUpdate = await User.findById(id)

    if(!brandUpdate){
        throw new Error('Hubo un error al encontrar la marca')
    }

    return brandUpdate;
}