import { Router, json } from 'express'
import FruitController from './FruitController'

const routes = Router()
const fruitController = new FruitController()

routes.get('/api/fruit/all', fruitController.getAllFruits)
routes.get('/api/fruit/family/:family', fruitController.getFruitsByFamily)
routes.get('/api/fruit/genus/:genus', fruitController.getFruitsByGenus)
routes.get('/api/fruit/order/:order', fruitController.getFruitsByOrder)
routes.get('/api/fruit/:nutrition', fruitController.getFruitsByNutritionValue)
routes.put('/api/fruit', json({type: 'application/json'}), fruitController.addFruit)
routes.all('*', (req, res) => {
  res.status(400).send('No such route/method')
})

export default routes