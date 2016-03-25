'use strict';

angular.module('feetClinicApp')
    .controller('AdminTherapistCtrl', function ($state,$stateParams,$scope,TherapistService,socket) {
      //---- init -----
      $scope.showGeneral = false;
      $scope.generalLabel = 'Vis general information';

      $scope.showHoliday = false;
      $scope.holidayLabel = 'Vis ferie';

      $scope.showTreatment = false;
      $scope.treatmentLabel = 'Vis behandlinger';

      $scope.showHours = false;
      $scope.hoursLabel = 'Vis åbningstider';


      TherapistService.get({id: $stateParams.id}, function (therapist) {
        $scope.therapist = therapist;
        socket.syncUpdates('Therapist',$scope.therapist);
      });

      $scope.updateTherapist = function() {
        console.log($scope.therapist);
        TherapistService.update({  id: $scope.therapist._id},$scope.therapist,
          function(therapist) {
            $scope.therapist = therapist;
          });};




      $scope.generalClick = function(){
        $scope.showGeneral = !$scope.showGeneral;
        if ($scope.showGeneral) {
          $scope.generalLabel = 'Skjul general information';
        }
        else {
          $scope.generalLabel = 'Vis general information';
        };
      };

      $scope.holidayClick = function(){
        $scope.showHoliday = !$scope.showHoliday;
        if ($scope.showHoliday) {
          $scope.holidayLabel = 'Skjul ferie';
        }
        else {
          $scope.holidayLabel = 'Vis ferie';
        };
      };

      $scope.treatmentClick = function(){
        $scope.showTreatment = !$scope.showTreatment;
        if ($scope.showTreatment) {
          $scope.treatmentLabel = 'Skjul behandlinger';
        }
        else {
          $scope.treatmentLabel = 'Vis behandlinger';
        };
      };

      $scope.hoursClick = function(){
        $scope.showHours = !$scope.showHours;
        if ($scope.showHours) {
          $scope.hoursLabel = 'Skjul åbningstider';
        }
        else {
          $scope.hoursLabel = 'Vis åbningstider';
        };
      };


    });
/*
 TherapistService.get({id: $stateParams.id}, function (therapist) {
 $scope.therapist = therapist;
 socket.syncUpdates('Therapist',$scope.therapist);
 });

 $scope.$on('$destroy',function() {
 socket.unsyncUpdates('Therapist');
 });

 //-- start  C R U D
 $scope.createTherapist = function(){
 TherapistService.save($scope.newTherapist, function(therapist){
 })
 };


 $scope.readTherapist = function() {

 };


 };

 */


