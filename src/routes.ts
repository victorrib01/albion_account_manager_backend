import {Router} from 'express'

import AccountController from './controllers/AccountController'
import CharController from './controllers/CharController'
import IslandController from './controllers/IslandController'
import BuildingController from './controllers/BuildingController'
import ConstructionController from './controllers/ConstructionController'
import ProductController from './controllers/ProductController'

const routes = Router()

// Account routes
routes.get('/accounts', AccountController.index);
routes.get('/accounts/:id', AccountController.show);
routes.post('/accounts', AccountController.create);
routes.put('/accounts/:id', AccountController.update);
routes.delete('/accounts/:id', AccountController.delete);
// Char routes
routes.get('/chars', CharController.index);
routes.post('/chars', CharController.create);
routes.get('/chars/:id', CharController.show);
routes.put('/chars/:id', CharController.update);
routes.delete('/chars/:id', CharController.delete);
// Island routes
routes.get('/islands', IslandController.index);
routes.post('/islands', IslandController.create);
routes.get('/islands/:id', IslandController.show);
routes.put('/islands/:id', IslandController.update);
routes.delete('/islands/:id', IslandController.delete);
// Building routes
routes.get('/buildings', BuildingController.index);
routes.post('/buildings', BuildingController.create);
routes.get('/buildings/:id', BuildingController.show);
routes.put('/buildings/:id', BuildingController.update);
routes.delete('/buildings/:id', BuildingController.delete);
// Construction routes
routes.get('/constructions', ConstructionController.index);
routes.post('/constructions', ConstructionController.create);
routes.get('/constructions/:id', ConstructionController.show);
routes.put('/constructions/:id', ConstructionController.update);
routes.delete('/constructions/:id', ConstructionController.delete);
// Product routes
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.create);
routes.get('/products/:id', ProductController.show);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

export default routes