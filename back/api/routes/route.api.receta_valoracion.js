import { Router } from 'express'
import * as controllers from '../controllers/controller.api.recetas_valoracion.js'

const route = Router()

route.get('/productos/:id/valoraciones', controllers.getValoraciones)
route.post('/productos/:id/valoraciones', controllers.agregarValoraciones)


export default route