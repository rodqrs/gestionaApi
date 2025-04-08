import { Router } from 'express';
import {
 getCrops,
 getCrop,
 getCropByProjectId,
 postCrop,
 putCrop,
 deleteCrop,
} from '../controllers/crop.js';
import validateID from '../middlewares/validateID.js';
import { verifyCrop } from '../middlewares/validateCrop.js';

const cropRouters = Router();

cropRouters.get('/crops', getCrops);
cropRouters.get('/crops/:id', validateID, getCrop);
cropRouters.get('/crops/project/:id', validateID, getCropByProjectId);
cropRouters.post('/crops', verifyCrop, postCrop);
cropRouters.put('/crops/:id', validateID, verifyCrop, putCrop);
cropRouters.delete('/crops/:id', validateID, deleteCrop);

export default cropRouters;
