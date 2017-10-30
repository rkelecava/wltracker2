app.factory('Entry', ['$http', function ($http) {
    var o = {};

    o.GetAll = function () {
        return $http.get('/api/v1/entry');
    };

    o.Add = function (payload) {
        return $http.post('/api/v1/entry', payload);
    };

    o.Delete = function (id) {
        return $http.delete('/api/v1/entry/' + id);
    }

    return o;
}]);