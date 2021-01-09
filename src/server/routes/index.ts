import { Router } from 'express';
import logs from './logs';
const routes = Router();

routes.use('/logs', logs);

export default routes;