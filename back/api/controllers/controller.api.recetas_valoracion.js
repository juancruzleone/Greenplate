import * as service from '../../services/recetas.valoraciones.services.js';

function getValoraciones(req, res) {
  const id = req.params.id;
  service.getValoraciones(id).then((valoraciones) => {
    res.status(200).json(valoraciones);
  });
}

function agregarValoracion(req, res) {
  const id = req.params.id;
  const valoracion = {
    usuario: req.body.usuario,
    valor: req.body.valor,
    comentario: req.body.comentario,
  };
  service.agregarValoracion(id, valoracion).then(() => {
    res.status(201).json(valoracion);
  });
}

export {
  getValoraciones,
  agregarValoracion
};
