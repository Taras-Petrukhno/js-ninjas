import {Router} from 'express';

import controller from '../controller/superhero-controller.js';
import upload from "../multer.js";
const router = new Router();

router.post('/', [upload.none(), controller.create]);
router.post('/uploadImages', [upload.array('images'), controller.uploadImages]);
router.put('/', [upload.array('images'), controller.update]);
router.delete('/:id', controller.delete);
router.get('/list/:countPerPage/:page', controller.getSome);

export default router;
