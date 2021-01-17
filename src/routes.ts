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
routes.get('/accounts', authMiddleware, AccountController.index);
routes.get('/accounts/:id', authMiddleware, AccountController.show);
routes.post('/accounts', authMiddleware, AccountController.create);
routes.put('/accounts/:id', authMiddleware, AccountController.update);
routes.delete('/accounts/:id', authMiddleware, AccountController.delete);

// Building routes
routes.get('/building_types', authMiddleware, BuildingTypeController.index);
routes.post('/building_types', authMiddleware, BuildingTypeController.create);
routes.get('/building_types/:id', authMiddleware, BuildingTypeController.show);
routes.put('/building_types/:id', authMiddleware, BuildingTypeController.update);
routes.delete('/building_types/:id', authMiddleware, BuildingTypeController.delete);

// Char routes
routes.get('/chars', authMiddleware, CharController.index);
routes.post('/chars', authMiddleware, CharController.create);
routes.get('/chars/:id', authMiddleware, CharController.show);
routes.put('/chars/:id', authMiddleware, CharController.update);
routes.delete('/chars/:id', authMiddleware, CharController.delete);

// Construction routes
routes.get('/constructions', authMiddleware, ConstructionController.index);
routes.post('/constructions', authMiddleware, ConstructionController.create);
routes.get('/constructions/:id', authMiddleware, ConstructionController.show);
routes.put('/constructions/:id', authMiddleware, ConstructionController.update);
routes.delete('/constructions/:id', authMiddleware, ConstructionController.delete);

// Daily Earnings routes
routes.get('/daily_earnings/lastearn', authMiddleware, DailyEarningController.lastEarn)
routes.get('/daily_earnings', authMiddleware, DailyEarningController.index);
routes.post('/daily_earnings', authMiddleware, DailyEarningController.create);
routes.get('/daily_earnings/:id', authMiddleware, DailyEarningController.show);
routes.put('/daily_earnings/:id', authMiddleware, DailyEarningController.update);
routes.delete('/daily_earnings/:id', authMiddleware, DailyEarningController.delete);

// Daily Costs routes
routes.get('/daily_costs/lastearn', authMiddleware, DailyCostController.lastEarn)
routes.get('/daily_costs', authMiddleware, DailyCostController.index);
routes.post('/daily_costs', authMiddleware, DailyCostController.create);
routes.get('/daily_costs/:id', authMiddleware, DailyCostController.show);
routes.put('/daily_costs/:id', authMiddleware, DailyCostController.update);
routes.delete('/daily_costs/:id', authMiddleware, DailyCostController.delete);

// Island routes
routes.get('/islands', authMiddleware, IslandController.index);
routes.post('/islands', authMiddleware, IslandController.create);
routes.get('/islands/:id', authMiddleware, IslandController.show);
routes.put('/islands/:id', authMiddleware, IslandController.update);
routes.delete('/islands/:id', authMiddleware, IslandController.delete);

// Island Types routes
routes.get('/island_types', authMiddleware, IslandTypesController.index);
routes.post('/island_types', authMiddleware, IslandTypesController.create);
routes.get('/island_types/:id', authMiddleware, IslandTypesController.show);
routes.put('/island_types/:id', authMiddleware, IslandTypesController.update);
routes.delete('/island_types/:id', authMiddleware, IslandTypesController.delete);

// Location routes
routes.get('/locations', authMiddleware, LocationController.index);
routes.post('/locations', authMiddleware, LocationController.create);
routes.get('/locations/:id', authMiddleware, LocationController.show);
routes.put('/locations/:id', authMiddleware, LocationController.update);
routes.delete('/locations/:id', authMiddleware, LocationController.delete);

// Product routes
routes.get('/products', authMiddleware, ProductController.index);
routes.post('/products', authMiddleware, ProductController.create);
routes.get('/products/:id', authMiddleware, ProductController.show);
routes.put('/products/:id', authMiddleware, ProductController.update);
routes.delete('/products/:id', authMiddleware, ProductController.delete);

// User routes
routes.post('/users', UserController.create)
routes.get('/users', authMiddleware, UserController.getUserId)

// Auth routes
routes.post('/auth', AuthController.authenticate);


export default routes