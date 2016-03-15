'use strict';

angular.module('feetClinicApp')
  .factory('TherapistService',function($resource){
    return $resource('/api/therapist/:id',{
      id:'@id'
    });
  });
