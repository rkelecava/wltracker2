const app = angular.module('wltracker', ['xeditable', 'ui.router', 'ui.bootstrap']);

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});