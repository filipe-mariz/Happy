import { Router } from 'express'
import orphanageControler from './controller/orphanagesControler';
import multer from 'multer'
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphanages', upload.array('images'),  orphanageControler.create);
routes.get('/orphanages', orphanageControler.index);
routes.get('/orphanages/:id', orphanageControler.show);

export default routes;