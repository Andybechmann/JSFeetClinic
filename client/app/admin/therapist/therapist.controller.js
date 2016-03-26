'use strict';

angular.module('feetClinicApp')
  .controller('AdminTherapistCtrl', function ($state, $stateParams, $scope, TherapistService, $mdDialog, $mdMedia) {
    //---- init -----
    $scope.showGeneral = false;
    $scope.generalLabel = 'General information';

    $scope.showHoliday = false;
    $scope.holidayLabel = 'Ferie';

    $scope.showTreatment = false;
    $scope.treatmentLabel = 'Behandlinger';

    $scope.showHours = false;
    $scope.hoursLabel = 'Åbningstider';


    TherapistService.get({id: $stateParams.id}, function (therapist) {
      $scope.therapist = therapist;
    });
// -------------------  init finish -----------------------
    $scope.addHolidayDialog = function() {
      $mdDialog.show({
          controller: HolidayDialogController,
          locals:{holiday:null},
          templateUrl: 'app/admin/therapist/chooseDatesDialog.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: true
        })
        .then(function (holiday) {
          addHoliday(holiday);
        }, function () {
          //do nothing
        });
    };

    $scope.editHolidayDialog = function (holidayToEdit) {
      $mdDialog.show({
          controller: HolidayDialogController,
          locals:{holiday:holidayToEdit},
          templateUrl: 'app/admin/therapist/chooseDatesDialog.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: true
        })
        .then(function (editedHoliday) {
          deleteHoliday(holidayToEdit);
          addHoliday(editedHoliday);
        }, function () {
          //do nothing
        });

    };


    $scope.deleteHolidayDialog = function (holiday) {
      var confirm = $mdDialog.confirm()
        .title('Ønsker du at slette denne ferieperiode?')
        .textContent('Du kan ikke fortryde denne handling bagefter !!!')
        .ok('Forsæt')
        .cancel('Fortryd');
      $mdDialog.show(confirm).then(function () {
        deleteHoliday(holiday);
      }, function () {
        //do nothing if cancelled
      });
    };

    var deleteHoliday = function (holiday) {
      var index = _.indexOf($scope.therapist.holiday, holiday);
      if (index > -1) {
        $scope.therapist.holiday.splice(index, 1);
      }
    };

    var addHoliday = function(holiday) {
      $scope.therapist.holiday.push(holiday);
    };

    $scope.updateTherapist = function () {
      console.log($scope.therapist);
      TherapistService.update({id: $scope.therapist._id}, $scope.therapist,
        function (therapist) {
          $scope.therapist = therapist;
        });
    };

    $scope.generalClick = function () {
      $scope.showGeneral = !$scope.showGeneral;
    };

    $scope.holidayClick = function () {
      $scope.showHoliday = !$scope.showHoliday;
    };

    $scope.treatmentClick = function () {
      $scope.showTreatment = !$scope.showTreatment;
    };

    $scope.hoursClick = function () {
      $scope.showHours = !$scope.showHours;
    };
  });


function HolidayDialogController($scope, $mdDialog,holiday) {
  $scope.minDate = new Date;
  if (holiday !== null) {
    $scope.startDate = new Date( holiday.startDate );
    $scope.endDate = new Date (holiday.endDate);
  }
  else {
    $scope.startDate = new Date;
    $scope.endDate = new Date;
  };

  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.firstDateClicked = function () {
    $scope.endDate = $scope.startDate;
  };
  $scope.saveHoliday = function () {
    var holiday = {startDate: $scope.startDate, endDate: $scope.endDate};
    $mdDialog.hide(holiday);
  };
}


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


