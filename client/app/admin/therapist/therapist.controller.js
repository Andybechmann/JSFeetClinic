'use strict';

angular.module('feetClinicApp')
  .controller('AdminTherapistCtrl', function ($state, $stateParams, $scope, TherapistService, $mdDialog,$timeout) {
    //---- init -----
    $scope.showGeneral = false;
    $scope.generalLabel = 'General information';

    $scope.showHoliday = false;
    $scope.holidayLabel = 'Ferie';

    $scope.showTreatment = false;
    $scope.treatmentLabel = 'Behandlinger';

    $scope.showHours = false;
    $scope.hoursLabel = 'Åbningstider';
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
          var index = _.indexOf($scope.therapist.holiday, holidayToEdit);
          if (index > -1) {
            $scope.therapist.holiday[index] = editedHoliday;
          }
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
      refreshSlider();
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

    TherapistService.get({id: $stateParams.id}, function (therapist) {
      $scope.therapist = therapist;
      passOpeningHoursSlider(therapist.dayWorking);
    });

    var passOpeningHoursSlider = function(dayWorking){
      $scope.daySliders = [];

      for(var i = 0; i < dayWorking.length; i++){
        var element = {};
        var start,end;
        if ("openingHours" in dayWorking[i] ){
          if ("startTime" in  dayWorking[i].openingHours ){
            start = translateTimeToNumber(dayWorking[i].openingHours.startTime);
          }
          else { start = 0; };
          if ("endTime" in  dayWorking[i].openingHours ){
            end = translateTimeToNumber(dayWorking[i].openingHours.endTime);
          }
          else { end = 288; };
        }
        else{
          start = 0;
          end = 288;
        };
        // slider for opening hours
        element.openingHours = {
          min: start,
          max: end,
          options: {
            floor: 0,
            ceil: 288,
            translate: function(value){
              return translateNumberToTimeString(value);
            },
            onEnd : function(){
              synchronize();
            }
          }
        };
        $scope.daySliders.push(element);
      } // end loop
    };

    var synchronize = function(){
      for(var i = 0; i < $scope.therapist.dayWorking.length; i++){
        console.log(i);
        var oh = $scope.therapist.dayWorking[i].openingHours;
        oh.startTime =
          translateNumberToTime( $scope.daySliders[i].openingHours.min);
        oh.endTime =
          translateNumberToTime( $scope.daySliders[i].openingHours.max);
      }
    };

    var translateTimeToNumber = function(time){
      //  console.log('start translate into number');
      var date = new Date(time);
      var h = date.getHours();
      var m = date.getMinutes();

      var result = h * 12 + m / 5;
      // console.log(time + '-->' + result);
      return result;

    };

    var translateNumberToTime = function(number){
      //console.log('start translate into time');
      var h = number / 12;
      var m = (number - h * 12 ) * 5;
      var date = new Date(2010,10,10,h,m);
      //  console.log(number + '-->' + date);
      return date;

    };

    var translateNumberToTimeString = function(number){
      // console.log('start translate into string time');
      var allMinutes = number * 5;
      var h = parseInt(allMinutes / 60);
      var m = parseInt(allMinutes % 60);
      var hStr = (h > 0) ? h : '0';
      var mStr = (m === 0) ? '00'  : ( (m <10) ? '0' + m : m );
      var glue = ':';
      //console.log(number + '-->' + hStr + glue + mStr);
      return hStr + glue + mStr;
    };




    var refreshSlider = function () {
      console.log('refreshed');
      $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
      });
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
};



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

