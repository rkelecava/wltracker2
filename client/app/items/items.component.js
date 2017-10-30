app.controller('ItemsCtrl', ['$scope', 'Items', function ($scope, Items) {

    $scope.showEditView = false;
    $scope.showAddView = false;

    Items.GetAll().then(function successCallBack(res) {
        $scope.items = res.data;
    }, function errorCallBack(res) {
        $scope.items = [];
    });

    $scope.EditItem = function () {
        if ($scope.selectedItem === '') {
            $scope.showEditView = false;
            return;
        }

        $scope.selectedItem = JSON.parse($scope.selectedItem);
        $scope.showEditView = true;
    };

    $scope.AddItem = function () {
        $scope.showAddView = true;
    };

    $scope.Update = function () {
        Items.UpdateItem($scope.selectedItem).then(function successCallBack(res) {
            Items.GetAll().then(function successCallBack(res2) {
                $scope.items = res2.data;
                $scope.selectedItem = '';
                $scope.showEditView = false;
            });
        }, function errorCallBack(err) {
            console.log(err);
        });
    };

    $scope.Delete = function () {
        Items.DeleteItem($scope.selectedItem._id).then(function successCallBack(res) {
            Items.GetAll().then(function successCallBack(res2) {
                $scope.items = res2.data;
                $scope.selectedItem = '';
                $scope.showEditView = false;
            });
        });
    };

    $scope.Add = function () {
        Items.AddItem($scope.addedItem).then(function successCallBack(res) {
            Items.GetAll().then(function successCallBack(res2) {
                $scope.items = res2.data;
                $scope.addedItem = {};
                $scope.showAddView = false;
            })
        })
    }

    $scope.CancelUpdate = function () {
        $scope.selectedItem = '';
        $scope.showEditView = false;
    };

    $scope.CancelAdd = function () {
        $scope.addedItem = {};
        $scope.showAddView = false;
    };

}]);