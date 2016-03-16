'use strict';

angular.module('feetClinicApp')
  .factory('TreatmentService', function($resource) {
    return $resource('/api/treatments/:id', {
      id: '@id'
    }, {
      update: {
        method: 'put'
      }
    },
    {
      myNewMethod:{
        method:'GET',params:{
          controller:'weeks'
        }
      }
    }
  );
  });
