'use strict';

angular.module('feetClinicApp')
  .controller('AdminTreatmentCtrl', function($scope, TreatmentService,socket) {

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



    $scope.updateTreatment = function(update) {
      console.log('i clicked');
      TreatmentService.update({
        id: update._id
      }, update, function(update) {
        console.log('update treatment', update);
      });

    };



    $scope.deleteTreatment = function(things) {
      TreatmentService.delete({
        id: things._id
      }, function(things) {
        console.log('delete treatment', things);
      });
    };
  });


/* $scope.createTreatment = function() {
      TreatmentService.save($scope.newTreatment, function(treatment) {
        //show result
        //console.log(treatment);
      })
    }
  });
  */

