'use strict';

angular.module('feetClinicApp')
  .controller('AdminTreatmentCtrl', function($scope, TreatmentService, $stateParams,$state,socket,$mdDialog) {
    $scope.id = $stateParams.id;

    $scope.isId = function () {
      return !(_.isEmpty($scope.id) );
    };

    if ($scope.isId()) {
      TreatmentService.get({id: $scope.id}, function (treatment) {
        $scope.treatment = treatment;
      });
    }
    else {
      TreatmentService.query(function (treatments) {
        $scope.treatments = treatments;
        socket.syncUpdates('Treatment',$scope.treatments);
      });

      $scope.$on('$destroy',function(){
        socket.unsyncUpdates('Treatment');
      });
    }

    $scope.goToDetail = function (treatment) {
      $state.go('adminTreatment', {id: treatment._id});
    };

    $scope.deleteTreatment = function(treatment){
      TreatmentService.delete({id:treatment._id},function(t){});
    };


    $scope.goBack = function(){
      window.history.back();
    };

    $scope.editDialog = function(ev,treatment){
      $mdDialog.show({
        controller: EditDialogController,
        templateUrl:'app/admin/treatment/editTreatmentDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true

      });
    };

    $scope.showAdvanced = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'dialog1.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    $scope.confirmDeleteDialog = function (treatment) {
      var confirm = $mdDialog.confirm().title('Ønsker du at slette denne behandling?')
        .textContent('Du kan ikke fortryde denne handling bagefter !!!')
        .ok('Forsæt')
        .cancel('Fortryd');
      $mdDialog.show(confirm).then(function () {
        $scope.deleteTreatment(treatment);
      });
    };

    function EditDialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }

  });




