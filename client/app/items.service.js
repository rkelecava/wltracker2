app.factory('Items', ['$http', function ($http) {
    var o = {};

    o.GetAll = function () {
        return $http.get('/api/v1/item');
    };

    o.UpdateItem = function (payload) {
        return $http.put('/api/v1/item/' + payload._id, payload);
    };

    o.DeleteItem = function (id) {
        return $http.delete('/api/v1/item/' + id);
    };

    o.AddItem = function (payload) {
        return $http.post('/api/v1/item', payload);
    };

    return o;
}]);