'use strict';

angular.module('feetClinicApp')
    .controller('AdminTherapistCtrl', function ($state,$stateParams,$scope,TherapistService,socket) {

      $scope.isId = !_.isEmpty($stateParams.id);
      $scope.therapists = {};
      $scope.therapist = {};


    $scope.goToTherapist = function(therapist){
      $state.go('adminTherapist',{id:therapist._id});
    };

      $scope.$on('$destroy',function() {
        socket.unsyncUpdates('Therapist');
      });

      TherapistService.query(function(therapists){
        $scope.therapists = therapists;
       // socket.syncUpdates('Therapist',$scope.therapists);
      });

      if (!$scope.isId) {
      } else {
        TherapistService.get({id: $stateParams.id}, function (therapist) {
          $scope.therapist = therapist;
          socket.syncUpdates('Therapist',$scope.therapist);
        });
      };



      //-- start  C R U D




    $scope.createTherapist = function(){
      TherapistService.save($scope.newTherapist, function(therapist){
      })
    };


    $scope.readTherapist = function() {
      TherapistService.get({id: $stateParams.id}, function (therapist) {
        $scope.therapist = therapist;
      });
    };

      $scope.updateTherapist = function(therapist) {
        TherapistService.update({  id: therapist._id}, therapist,
          function(therapist) {
          });
      };

      $scope.deleteTherapist = function(therapist){
        TherapistService.delete({id:therapist._id}, function(therapist){
        });
      };
    });


        // --- end C R U D
