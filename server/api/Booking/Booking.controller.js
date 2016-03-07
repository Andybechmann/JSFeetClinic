/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/bookings              ->  index
 * POST    /api/bookings              ->  create
 * GET     /api/bookings/:id          ->  show
 * PUT     /api/bookings/:id          ->  update
 * DELETE  /api/bookings/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Booking from './Booking.model';

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
    var updated = _.merge(entity, updates);
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

// Gets a list of Bookings
export function index(req, res) {
  Booking.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Booking from the DB
export function show(req, res) {
  Booking.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Booking in the DB
export function create(req, res) {
  Booking.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Booking in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Booking.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Booking from the DB
export function destroy(req, res) {
  Booking.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
