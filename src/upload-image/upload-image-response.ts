
// Para saber si se subió una imagen o no (cloudinary)

import { UploadApiErrorResponse, UploadApiResponse} from 'cloudinary'
export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse