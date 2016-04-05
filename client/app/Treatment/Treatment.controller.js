'use strict';

angular.module('feetClinicApp')
  .controller('TreatmentCtrl', function ($scope,TreatmentService, socket,$stateParams,$state) {

    $scope.id = $stateParams.id;
    console.log('id= ' + $scope.id);

    TreatmentService.query( function(treatments) {
      $scope.treatments = treatments;
    });

    $scope.isId = function(){
      return   !(_.isEmpty($scope.id) );
    };

    /*
    socket.syncUpdates('Treatment',$scope.treaments,
    function(event){
      console.log('updatet',event);
    });*/
    if( $scope.isId() ){

      TreatmentService.get({id: $scope.id},  function(treatment){
      $scope.treatment = treatment;
    });
  }



    $scope.goToDetail = function(treatment){
      $state.go('Treatment',{id:treatment._id});
    };

    $scope.$on('$destroy',function(){
      socket.unsyncUpdates('Treatment');
    });
  });
