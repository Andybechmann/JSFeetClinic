'use strict';

angular.module('feetClinicApp')
  .factory('TherapistService',function($resource){
    return $resource('/api/therapist/:id/:name',
      {
        id: '@id'
      }, {
        update: {method: 'PUT'}, params: {id: '@id'}
      },
      {
        get:{method:'GET',isArray:false}
      },
      {
        query:{method:'GET',isArray:true}
      }
    );
    });
