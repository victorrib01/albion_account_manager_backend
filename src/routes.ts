import {Router} from 'express'

import AccountController from './controllers/AccountController'
import BuildingTypeController from './controllers/BuildingTypeController'
import CharController from './controllers/CharController'
import ConstructionController from './controllers/ConstructionController'
import DailyEarningController from './controllers/DailyEarningController'
import DailyCostController from './controllers/DailyCostController'
import IslandController from './controllers/IslandController'
import IslandTypesController from './controllers/IslandTypeController'
import LocationController from './controllers/LocationController'
import ProductController from './controllers/ProductController'
import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'

import authMiddleware from './middlewares/authMiddleware'

const routes = Router()

// Account routes
routes.get('/accounts', AccountController.index);
routes.get('/accounts/:id', AccountController.show);
routes.post('/accounts', AccountController.create);
routes.put('/accounts/:id', AccountController.update);
routes.delete('/accounts/:id', AccountController.delete);

// Building routes
routes.get('/building_types', BuildingTypeController.index);
routes.post('/building_types', BuildingTypeController.create);
routes.get('/building_types/:id', BuildingTypeController.show);
routes.put('/building_types/:id', BuildingTypeController.update);
routes.delete('/building_types/:id', BuildingTypeController.delete);

// Char routes
routes.get('/chars', CharController.index);
routes.post('/chars', CharController.create);
routes.get('/chars/:id', CharController.show);
routes.put('/chars/:id', CharController.update);
routes.delete('/chars/:id', CharController.delete);

// Construction routes
routes.get('/constructions', ConstructionController.index);
routes.post('/constructions', ConstructionController.create);
routes.get('/constructions/:id', ConstructionController.show);
routes.put('/constructions/:id', ConstructionController.update);
routes.delete('/constructions/:id', ConstructionController.delete);

// Daily Earnings routes
routes.get('/daily_earnings/lastearn', DailyEarningController.lastEarn)
routes.get('/daily_earnings', DailyEarningController.index);
routes.post('/daily_earnings', DailyEarningController.create);
routes.get('/daily_earnings/:id', DailyEarningController.show);
routes.put('/daily_earnings/:id', DailyEarningController.update);
routes.delete('/daily_earnings/:id', DailyEarningController.delete);

// Daily Costs routes
routes.get('/daily_costs/lastearn', DailyCostController.lastEarn)
routes.get('/daily_costs', DailyCostController.index);
routes.post('/daily_costs', DailyCostController.create);
routes.get('/daily_costs/:id', DailyCostController.show);
routes.put('/daily_costs/:id', DailyCostController.update);
routes.delete('/daily_costs/:id', DailyCostController.delete);

// Island routes
routes.get('/islands', IslandController.index);
routes.post('/islands', IslandController.create);
routes.get('/islands/:id', IslandController.show);
routes.put('/islands/:id', IslandController.update);
routes.delete('/islands/:id', IslandController.delete);

// Island Types routes
routes.get('/island_types', IslandTypesController.index);
routes.post('/island_types', IslandTypesController.create);
routes.get('/island_types/:id', IslandTypesController.show);
routes.put('/island_types/:id', IslandTypesController.update);
routes.delete('/island_types/:id', IslandTypesController.delete);

// Location routes
routes.get('/locations', LocationController.index);
routes.post('/locations', LocationController.create);
routes.get('/locations/:id', LocationController.show);
routes.put('/locations/:id', LocationController.update);
routes.delete('/locations/:id', LocationController.delete);

// Product routes
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.create);
routes.get('/products/:id', ProductController.show);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

// User routes
routes.post('/users', UserController.create)
routes.get('/users', authMiddleware, UserController.getUserId)

// Auth routes
routes.post('/auth', AuthController.authenticate);


export default routes