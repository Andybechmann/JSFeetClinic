'use strict';

angular.module('feetClinicApp')
  .controller('AdminTreatmentCtrl', function ($scope, TreatmentService, $stateParams, $state, socket, $mdDialog) {
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
        $scope.types = [];
         _($scope.treatments).uniq(a => a.type).forEach(a => $scope.types.push(a.type));
        socket.syncUpdates('Treatment', $scope.treatments);
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('Treatment');
      });
    }




    $scope.goToDetail = function (treatment) {
      $state.go('adminTreatment', {id: treatment._id});
    };

    $scope.deleteTreatment = function (treatment) {
      TreatmentService.delete({id: treatment._id}, function (t) {
      });
    };


    $scope.goBack = function () {
      window.history.back();
    };

    $scope.editDialog = function (ev, treatmentToEdit) {
      $mdDialog.show({
        controller: EditDialogController,
        templateUrl: 'app/admin/treatment/treatmentDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {treatment: treatmentToEdit,types: $scope.types},
        clickOutsideToClose: true,
        fullscreen: true
      }).then(function (modifiedTreatment) {
        var index = _.findIndex($scope.treatments, function(t) {return t._id == modifiedTreatment._id} );
        if (index > -1) {
          TreatmentService.update( {id:$scope.treatments[index]._id}, modifiedTreatment);
        }else {
          TreatmentService.save(modifiedTreatment,function(treatment){})
        }
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

    function EditDialogController($scope, $mdDialog, treatment,types) {
      if (treatment != null) {
        $scope.modifiedTreatment = {
          _id: treatment._id,
          name: treatment.name,
          description: treatment.description,
          imageUrl: treatment.imageUrl,
          price: treatment.price,
          duration: treatment.duration,
          type: treatment.type
        };
      }
      $scope.types = types;

      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.answer = function (result) {
        $mdDialog.hide(result);
      };
    }

  });




