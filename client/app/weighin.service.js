app.factory('Weighin', ['$http', function ($http) {
    var o = {};

    o.GetAll = function () {
        return $http.get('/api/v1/weighin');
    };

    o.Add = function (payload) {
        return $http.post('/api/v1/weighin', payload);
    };

    o.Delete = function (id) {
        return $http.delete('/api/v1/weighin/' + id);
    };

    return o;
}]);