/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/therapist              ->  index
 * POST    /api/therapist              ->  create
 * GET     /api/therapist/:id          ->  show
 * PUT     /api/therapist/:id          ->  update
 * DELETE  /api/therapist/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Therapist from './Therapist.model';

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

// Gets a list of Therapists
export function index(req, res) {
  Therapist.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Therapist from the DB
export function show(req, res) {
  Therapist.findById(req.params.id)
    .populate('treatments','name')
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Therapist in the DB
export function create(req, res) {
  Therapist.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Therapist in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Therapist.findById(req.params.id)
    .populate('treatments','name')
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Therapist from the DB
export function destroy(req, res) {
  Therapist.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
