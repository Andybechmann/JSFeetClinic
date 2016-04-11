'use strict';

angular.module('feetClinicApp')
  .factory('TherapistService', function ($resource) {
    return $resource('/api/therapist/:id',
      {
        id: '@id'
      }, {
        update: {method: 'PUT'}, params: {id: '@id'}
      }

    );
  });
