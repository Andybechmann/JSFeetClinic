'use strict';

angular.module('feetClinicApp')
  .factory('TreatmentService', function($resource) {
    return $resource('/api/treatments/:id',
      {
        id: '@id'
      },
      {
        update: {method: 'PUT'}, params: {id: '@id'}
      }
    );
  });
