'use strict';

angular.module('feetClinicApp')
  .controller('AdminTherapistsCtrl', function ($scope,TherapistService,socket,$state,$mdDialog) {

    // var ----

    $scope.goToTherapist = function(therapist){
      $state.go('adminTherapist',{id:therapist._id});
    };

    TherapistService.query(function(therapists){
      $scope.therapists = therapists;
      socket.syncUpdates('Therapist',$scope.therapists)
    });

    $scope.$on('$destroy',function(){
      socket.unsyncUpdates('Therapist');
    });

    $scope.deleteTherapist = function(therapistToDel){
      TherapistService.delete({id:therapistToDel._id}, function(therapist){});
    };

/*
    $scope.createTherapist = function(){
      TherapistService.save($scope.newTherapist,function(therapist){
        console.log(therapist);
      });
    };
  */


    $scope.confirmDelete = function(therapist){
      console.log('confirm dialog');
      var confirm = $mdDialog.confirm()
        .title('Ønsker du at slette denne behandler?')
        .textContent('Du kan ikke fortryde denne handling bagefter !!!')
        .ariaLabel('Lucky day')
        .ok('Forsæt')
        .cancel('fortryd');
      $mdDialog.show(confirm).then(function() {
        $scope.deleteTherapist(therapist);
      }, function() {
        //do nothing
      });
    };

  });
