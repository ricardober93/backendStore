import multer from 'multer';
const maxSizeUpload = 200000 

const storage = multer.diskStorage({
    destination: 'assets/',
  })
export const multerI = multer({
    storage,
    dest: 'assets/',
    limits: {
        fieldSize: maxSizeUpload
    }
  }).single('avatar');
//Avatar incluye las dos subida de imagenes tanto con logo como con avatar