'use strict';

angular.module('feetClinicApp')
  .controller('TreatmentCtrl', function ($scope,TreatmentService, socket) {

    TreatmentService.query(function(treatments) {
      $scope.treatments = treatments;
    });

    socket.syncUpdates('Treatment',$scope.treaments,
    function(event){
      console.log('updatet',event);
    });

    $scope.$on('$destroy',function(){
      socket.unsyncUpdates('Treatment');
    });
  });
