'use strict';

angular.module('feetClinicApp')
  .controller('AdminTreatmentCtrl', function ($scope,TreatmentService) {

    $scope.createTreatment = function(){
      TreatmentService.save($scope.newTreatment,function(treatment){
        //show result
        //console.log(treatment);
      })
    }
  });
