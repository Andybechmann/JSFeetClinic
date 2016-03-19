'use strict';

angular.module('feetClinicApp')
  .factory('TherapistService',function($resource){
    return $resource('/api/therapist/:id',
      {
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
      },
      {
        get:{method:'GET',isArray:false}
      },
      {
        query:{method:'GET',isArray:true, cache:false}
      }
    );
    });
