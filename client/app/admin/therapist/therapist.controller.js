'use strict';

angular.module('feetClinicApp')
  .controller('AdminTherapistCtrl', function ($state, $stateParams, $scope, TherapistService,TreatmentService, $mdDialog, $timeout,socket) {
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
//-------------------------------------------------------------------

    $scope.addHolidayDialog = function () {
      $mdDialog.show({
          controller: HolidayDialogController,
          locals: {holiday: null},
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
          locals: {holiday: holidayToEdit},
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

    TherapistService.get({id: $stateParams.id}, function (therapist) {
      $scope.therapist = therapist;
      passOpeningHoursSlider(therapist.dayWorking);
    });

    $scope.updateTherapist = function () {
      console.log('befor update',$scope.therapist);
      TherapistService.update({id: $scope.therapist._id}, $scope.therapist,
        function (therapist) {
          console.log('efter update',therapist);
          $scope.therapist = therapist;
        });
    };

    var deleteHoliday = function (holiday) {
      var index = _.indexOf($scope.therapist.holiday, holiday);
      if (index > -1) {
        $scope.therapist.holiday.splice(index, 1);
      }
    };
    var addHoliday = function (holiday) {
      $scope.therapist.holiday.push(holiday);
    };



    TreatmentService.query(function(treatments){
      $scope.allTreatments = treatments;
      socket.syncUpdates('Treatment',$scope.allTreatments);
    });

    $scope.$on('$destroy',function(){
      socket.unsyncUpdates('Therapist');
      socket.unsyncUpdates('Treatment');
    });


    $scope.hasTreatment = function(treatment,list){
      return _.findIndex(list , function(o){
        return o._id === treatment._id;
      })  > -1;

    };

    $scope.toggleTreatment = function (treatment, list) {
      var index =  _.findIndex(list , function(o){
        return o._id === treatment._id;
      });
      if (index > -1) {
        _.remove(list, function(o){return o._id === treatment._id})
      }
      else {
        var t = {};
        t._id = treatment._id;
        list.push(t);
      }
    };
  



    var passOpeningHoursSlider = function (dayWorking) {
      $scope.daySliders = [];
      for (var i = 0; i < dayWorking.length; i++) {
        var workingDay = dayWorking[i];
        var slider = {};
        slider.day = workingDay.dayOfWeek;
        slider.pauses = [];
        var start, end;
        if ('openingHours' in workingDay) {
          if ('startTime' in workingDay.openingHours) {
            start = translateTimeToNumber(workingDay.openingHours.startTime);
          }
          else {
            start = 0;
          }

          if ('endTime' in workingDay.openingHours) {
            end = translateTimeToNumber(workingDay.openingHours.endTime);
          }
          else {
            end = 288;
          }

        }
        else {
          start = 0;
          end = 288;
        }

        // slider for opening hours
        slider.openingHours = {
          min: start,
          max: end,
          options: {
            floor: 0,
            ceil: 288,
            id: workingDay.dayOfWeek,
            translate: function (value) {
              return translateNumberToTimeString(value);
            },
            onEnd: function (id,start,end) {
              synchronizeOpeningHours(id,start,end);
            }
          }
        };
        //sliders for pauses
        for (var j = 0; j < workingDay.pauses.length; j++) {
          var el = {
            min: translateTimeToNumber( workingDay.pauses[j].startTime),
            max: translateTimeToNumber( workingDay.pauses[j].endTime),
            options: {
              floor: start,
              ceil: end,
              id:workingDay.dayOfWeek + j,
              draggableRangeOnly: true,
              translate: function (value) {
                return translateNumberToTimeString(value);
              },
              onEnd: function (id,start,end) {
                synchronizePause(id,start,end);
              }
            }
          };
          slider.pauses[j] = el;
        }
        slider.numberOfPauses = {
          value: workingDay.pauses.length,
          options: {
            floor: 0,
            ceil: 4,
            id: workingDay.dayOfWeek,
            showTicks: true,
            onEnd: function (dayId,value) {
              numberOfPausesChanged(dayId,value);
            }
          }
        };
        $scope.daySliders[i] = slider;
      } // end loop
    };

    var numberOfPausesChanged = function(dayId,value){
      var workingDay = _($scope.therapist.dayWorking).find( day => day.dayOfWeek === dayId);//date
      var daySlider = _($scope.daySliders).find( d => d.day === dayId);//numbers
      var oldArray = workingDay.pauses;//date
      var oldSliders = daySlider.pauses;//numbers
      var difference = value - oldArray.length;
      if (difference < 0){
        for(var i = 0; i < Math.abs(difference); i++){
          oldArray.splice( oldArray.length - 1, 1);
          oldSliders.splice(oldSliders.length - 1 , 1);
        }
      }
      else if(difference > 0 ){
        for(var i = 0; i < Math.abs(difference); i++){
          var pause = oldArray[oldArray.length -1];
          var sliderPause = oldSliders[oldSliders.length - 1 ];

          var newPause={};//date
          var newSlider={};//numbers
          var sliderId;
          var start;
          var end;
          if(sliderPause === null){
            start = daySlider.openingHours.min;
            end = daySlider.openingHours.min + 6;
            sliderId = daySlider.day + 0;
          }
          else{
            var id = sliderPause.options.id;
            var index = parseInt( id.substring( id.length-1 , id.length)); // take last symbol in  id
            var nameOfDay = id.substring(0,id.length - 1); //take the day as string
            start = sliderPause.max;
            end =   sliderPause.max + (sliderPause.max - sliderPause.min);
            sliderId = nameOfDay+(index+1);
          }

          newSlider = {
            min: start,
            max: end ,
            options: {
              id:sliderId,
              floor: daySlider.openingHours.min,
              ceil: daySlider.openingHours.max,
              draggableRangeOnly: true,
              translate: function (value) {
                return translateNumberToTimeString(value);
              },
              onEnd: function (id,start,end) {
                synchronizePause(id,start,end);
              }
            }
          };

          //date
          if (pause === null){
            var timeStart = new Date(workingDay.openingHours.startTime);
            newPause.startTime = timeStart;
            var minutes = timeStart.getMinutes();
            var timeEnd = new Date(workingDay.openingHours.startTime);
            timeEnd.setMinutes(minutes + 30);
            newPause.endTime = timeEnd;
          }else {
            var timeStart = new Date(pause.endTime);
            newPause.startTime = timeStart;
            var minutes = timeStart.getMinutes();
            var timeEnd = new Date(pause.endTime);
            timeEnd.setMinutes(minutes + 30);
            newPause.endTime = timeEnd;
          }
          oldArray.push(newPause);
          oldSliders.push(newSlider);
        }
      }else {
      }
    };

    var synchronizePause = function (id,start,end) {
      var index = parseInt( id.substring( id.length-1 , id.length)); // take last symbol in  id and
      var nameOfDay = id.substring(0,id.length - 1);
      var workingDay = _($scope.therapist.dayWorking).find( day => day.dayOfWeek === nameOfDay);
      workingDay.pauses[index].startTime = translateNumberToTime(start);
      workingDay.pauses[index].endTime =translateNumberToTime(end);
    };
    var synchronizeOpeningHours = function (id,start,end) {
      var day = _($scope.therapist.dayWorking).find( day => day.dayOfWeek === id);
      var startTime = translateNumberToTime(start);
      var endTime = translateNumberToTime(end);
      day.openingHours.startTime = startTime;
      day.openingHours.endTime = endTime;
      var daySlider = _($scope.daySliders).find( d => d.day === id);
      for(var i = 0; i < day.pauses.length; i++ ){
        var duration = daySlider.pauses[i].max - daySlider.pauses[i].min;
        daySlider.pauses[i].options.floor = start;
        daySlider.pauses[i].options.ceil = end;

        if (daySlider.pauses[i].min < start) {
          daySlider.pauses[i].min = start;
          daySlider.pauses[i].max = start + duration;
        }

        if (daySlider.pauses[i].max > end) {
          daySlider.pauses[i].max = end;
          daySlider.pauses[i].min = end - duration;
        }



      }
    };
    var translateTimeToNumber = function (time) {
      var date = new Date(time);
      var h = date.getHours();
      var m = date.getMinutes();
      var result = h * 12 + m / 5;
      return result;
    };

    var translateNumberToTime = function (number) {
      var hour = parseInt(number / 12);
      var minute = (number - hour * 12 ) * 5;
      var date = new Date(2010, 10, 10, hour, minute);
      return date;
    };

    var translateNumberToTimeString = function (number) {
      var allMinutes = number * 5;
      var h = parseInt(allMinutes / 60);
      var m = parseInt(allMinutes % 60);
      var hStr = (h > 0) ? h : '0';
      var mStr = (m === 0) ? '00' : ( (m < 10) ? '0' + m : m );
      var glue = ':';
      return hStr + glue + mStr;
    };
    var refreshSlider = function () {
      console.log('refreshed');
      $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
      });
    };

function HolidayDialogController($scope, $mdDialog, holiday) {
  $scope.minDate = new Date();
  if (holiday !== null) {
    $scope.startDate = new Date(holiday.startDate);
    $scope.endDate = new Date(holiday.endDate);
  }
  else {
    $scope.startDate = new Date();
    $scope.endDate = new Date();
  }

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
});
