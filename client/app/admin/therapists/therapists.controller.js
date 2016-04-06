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


    $scope.createTherapist = function(newTherapist){
      TherapistService.save(newTherapist,function(therapist){
       // console.log(therapist);
      });
    };

    $scope.confirmDelete = function(therapist){
      var confirm = $mdDialog.confirm()
        .title('Ønsker du at slette denne behandler?')
        .textContent('Du kan ikke fortryde denne handling bagefter !!!')
        .ok('Forsæt')
        .cancel('fortryd');
      $mdDialog.show(confirm).then(function() {
        $scope.deleteTherapist(therapist);
      }, function() {
        //do nothing
      });
    };

    $scope.addTherapistDialog = function() {
      $mdDialog.show({
          controller: TherapistDialogController,
          templateUrl: 'app/admin/therapists/addTherapistDialog.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: true
        })
        .then(function (therapist) {
          $scope.createTherapist(therapist)
        }, function () {
          //do nothing
        });
    };

  });


function TherapistDialogController($scope, $mdDialog) {
  $scope.newTherapist = {
    name:'',
    description:'',
    imageUrl:'',
    treatments:[],
    dayWorking: [],
    holiday : []
  };

  var dayToString = function (numberOfDay) {
    switch(numberOfDay) {
      case 1: {return 'Mandag';}
      case 2: {return 'Tirsdag';}
      case 3: {return 'Onsdag';}
      case 4: {return 'Torsdag';}
      case 5: {return 'Fredag';}
      case 6: {return 'Lørdag';}
      case 7: {return 'Søndag';}
      default: {return 'Ikke angivet';}
    }
  };

  for (var i = 1; i < 8; i++){
    $scope.newTherapist.dayWorking.push({
      dayOfWeek:dayToString(i),
      active: false,
      openingHours:{startTime: new Date(2010,10,10,7,0), endTime: new Date(2010,10,10,15,0)},
      pauses:[]
    });
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.saveTherapist = function (therapist) {
    $mdDialog.hide(therapist);
  };
};

