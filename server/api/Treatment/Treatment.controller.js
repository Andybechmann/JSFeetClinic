/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/treatments              ->  index
 * POST    /api/treatments              ->  create
 * GET     /api/treatments/:id          ->  show
 * PUT     /api/treatments/:id          ->  update
 * DELETE  /api/treatments/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Treatment from './Treatment.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.assign(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Treatments
/*
export function index(req, res) {
  var p = req.query;
  var selectString ='';


  console.log( 'name: ' + p.name);
  console.log('therName:' + p.therapistName);

  console.log('name:' +  req.query.name);
  console.log('therName:' + p.query.therapistName);

  selectString = p.only !== undefined ? selectString + p.only + ' ' : '';
  console.log(p);
  console.log(selectString);

    Treatment.findAsync({},selectString)
    .then(respondWithResult(res))
    .catch(handleError(res));
}
*/
// Gets a list of Treatments
export function index(req, res) {
  Treatment.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*
 export function show(req, res) {
 Thing.findById(req.params.id)
 .select('name')
 .execAsync()
 .then(handleEntityNotFound(res))
 .then(respondWithResult(res))
 .catch(handleError(res));
 }
 */

// Gets a single Treatment from the DB
export function show(req, res) {
  Treatment.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Treatment in the DB
export function create(req, res) {
  Treatment.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Treatment in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Treatment.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Treatment from the DB
export function destroy(req, res) {
  Treatment.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
