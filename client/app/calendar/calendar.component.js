app.controller('CalendarCtrl', ['$scope', 'Weighin', 'Entry', 'Items', function ($scope, Weighin, Entry, Items) {

    $scope.currentDate = new Date();
    $scope.myDate = new Date();
    $scope.calendar = [];

    $scope.checkObj = function (obj) {
        if (!isEmpty(obj)) {
            return true;
        } else {
            return false;
        }
    };

    $scope.deleteWeighin = function (weighin) {
        Weighin.Delete(weighin._id).then(function successCallBack(res) {
            $scope.changeMonth();
        });
    };

    $scope.deleteEntry = function (entry) {
        Entry.Delete(entry._id).then(function successCallBack(res) {
            $scope.changeMonth();
        });
    };

    $scope.addItem = function (day) {
        var date = new Date($scope.currentDate);
        date.setDate(day);

        var item = {};

        $scope.calendar.forEach((calItem) => {
            if (calItem.day === day && calItem.style !== 'calendar-disabled') {
                item = calItem;
            }
        }, this);

        var payload = {
            logged: Date.parse(date),
            item: item.addItemId,
            quantity: item.addQuantity
        };
        console.log(item);
        if (item.addWeight && item.addWeight !== '') {
            // Add Weight
            var newPayload = {
                entered: Date.parse(date),
                weight: item.addWeight
            };
            if (payload.item && payload.item !== '') {
                Weighin.Add(newPayload).then(function successCallBack(res1) {
                    Entry.Add(payload).then(function successCallBack(res2) {
                        $scope.calendar.forEach((calItem) => {
                            if (calItem.day === day) {
                                $scope.changeMonth();
                            }
                        }, this);
                    });
                });
            } else {
                Weighin.Add(newPayload).then(function successCallBack(res1) {
                    $scope.changeMonth();
                });
            }
        } else {
            if (payload.item && payload.item !== '') {
                Entry.Add(payload).then(function successCallBack(res) {
                    $scope.calendar.forEach((calItem) => {
                        if (calItem.day === day) {
                            $scope.changeMonth();
                        }
                    }, this);
                });
            }
        }
    };

    $scope.changeMonth = function (option) {

        Weighin.GetAll().then(function successCallBack(res1) {
            Entry.GetAll().then(function successCallBack(res2) {
                var date = $scope.myDate;
                if (option === 'forward') {
                    if ((date.getMonth() + 1) === 12) {
                        date.setFullYear(date.getFullYear() + 1);
                        date.setMonth(0);
                        date.setDate(1);
                        var d = date;
                    } else {
                        date.setMonth(date.getMonth() + 1);
                        date.setDate(1);
                        var d = date;
                    }
                } else if (option === 'backward') {
                    if ((date.getMonth() - 1) === -1) {
                        date.setFullYear(date.getFullYear() - 1);
                        date.setMonth(11);
                        date.setDate(1);
                        var d = date;
                    } else {
                        date.setMonth(date.getMonth() - 1);
                        date.setDate(1);
                        var d = date;
                    }
                } else {
                    var d = date;
                }
        
                var t = new Date(d.getFullYear(), d.getMonth(), 1);
                var weekDay = t.getDay();
                var startOffset = 0;
                var daysInCurrentMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
                var previousMonth = d.getMonth() - 1;
                var previousYear = d.getFullYear();
        
                if (previousMonth === -1) {
                    previousMonth = 11;
                    previousYear = previousYear -1;
                }
        
                var newD = new Date(previousYear, previousMonth + 1, 0);
        
                var daysInPreviousMonth = new Date(previousYear, previousMonth + 1, 0).getDate();
        
                switch(weekDay) {
                    case 0:
                        startOffset = 7;
                        break;
                    case 1:
                        startOffset = 1;
                        break;
                    case 2:
                        startOffset = 2;
                        break;
                    case 3:
                        startOffset = 3;
                        break;
                    case 4:
                        startOffset = 4;
                        break;
                    case 5:
                        startOffset = 5;
                        break;
                    case 6:
                        startOffset = 6;
                        break;
                    default:
                        break;
                }
        
                var totalDaysFromStart = startOffset + daysInCurrentMonth;
        
                var currentDay = 0;
                var endDay = 0;
        
                var items = [];
        
                for (var i = 0; i < 42; i++) {
                    currentDay++;
        
                    if (currentDay <= startOffset) {
                        var previousMonthDay = daysInPreviousMonth - (startOffset - currentDay);
                        var item = {
                            pos: i,
                            style: 'calendar-disabled',
                            day: previousMonthDay
                        };
                        items.push(item);
        
                    } else {
                        var newDay = currentDay - startOffset;
                        if (newDay > daysInCurrentMonth) {
                            endDay++;
                            var item = {
                                pos: i,
                                style: 'calendar-disabled',
                                day: endDay
                            };
                            items.push(item);
                
                        } else {
                            var matchingEntries = [];
                            var actualWeighin = {};
                            var total = 0;
                            // This part for entries
                            res2.data.forEach((entry) => {
                                var date = new Date(entry.logged);
                                if (t.getMonth() === date.getMonth() && t.getFullYear() === date.getFullYear() && date.getDate() === newDay) {
                                    matchingEntries.push(entry);
                                    total+=entry.item.calories * entry.quantity;
                                }
                            }, this);
                            // This part for weighins
                            res1.data.forEach((weighin) => {
                                var date = new Date(weighin.entered);
                                if (t.getMonth() === date.getMonth() && t.getFullYear() === date.getFullYear() && date.getDate() === newDay) {
                                    actualWeighin = weighin;
                                }
                            }, this);
    
                            var item = {
                                pos: i,
                                style: '',
                                formFlag: false,
                                day: newDay,
                                entries: matchingEntries,
                                total: total,
                                actualWeighin: actualWeighin
                            };

                            items.push(item);
                        }
        
                        $scope.calendar = items;
                        $scope.currentDate = d;
                        $scope.myDate = d;
                    }
                }
            });
        });
    };

    function buildCalendarStructure() {

        Weighin.GetAll().then(function successCallBack(res1) {
            Entry.GetAll().then(function successCallBack(res2) {
                var d = new Date();
                var t = new Date(d.getFullYear(), d.getMonth(), 1);
                var weekDay = t.getDay();
                var startOffset = 0;
                var daysInCurrentMonth = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
                var currentMonth = d.getMonth();
                var previousMonth = d.getMonth() - 1;
                var previousYear = d.getFullYear();
        
                if (previousMonth === -1) {
                    previousMonth = 11;
                    previousYear = previousYear - 1;
                }
        
                var newD = new Date(previousYear, previousMonth+1, 0);
        
                var daysInPreviousMonth = new Date(previousYear, previousMonth+1, 0).getDate();
                
                switch(weekDay) {
                    case 0:
                        startOffset = 6;
                        break;
                    case 1:
                        startOffset = 0;
                        break;
                    case 2:
                        startOffset = 1;
                        break;
                    case 3:
                        startOffset = 2;
                        break;
                    case 4:
                        startOffset = 3;
                        break;
                    case 5:
                        startOffset = 4;
                        break;
                    case 6:
                        startOffset = 5;
                        break;
                    default:
                        break;
                }
                
                var totalDaysFromStart = startOffset + daysInCurrentMonth;
        
                var currentDay = 0;
        
                var endDay = 0;
        
                var items = [];
                
                for(var i = 0; i < 42; i++) {
                    currentDay++;
        
                    if ((currentDay - 1) <= startOffset) {
                        var previousMonthDay = daysInPreviousMonth - (startOffset - (currentDay - 1));
                        
                        var item = {
                            pos: i,
                            style: 'calendar-disabled',
                            day: previousMonthDay
                        };
        
                        items.push(item); 
        
                    } else {
                        var newDay = (currentDay-1) - startOffset;
        
                        if (newDay > daysInCurrentMonth) {
                            endDay++;
        
                            var item = {
                                pos: i,
                                style: 'calendar-disabled',
                                day: endDay
                            };
        
                            items.push(item);
                            
                        } else {
                            var matchingEntries = [];
                            var actualWeighin = {};
                            var total = 0;
                            // This part for entries
                            res2.data.forEach((entry) => {
                                var date = new Date(entry.logged);
                                if (t.getMonth() === date.getMonth() && t.getFullYear() === date.getFullYear() && date.getDate() === newDay) {
                                    matchingEntries.push(entry);
                                    total+=entry.item.calories * entry.quantity;
                                }
                            }, this);
                            // This part for weighins
                            res1.data.forEach((weighin) => {
                                var date = new Date(weighin.entered);
                                
                                if (t.getMonth() === date.getMonth() && t.getFullYear() === date.getFullYear() && date.getDate() === newDay) {
                                    actualWeighin = weighin;
                                    
                                }
                            }, this);

                            var item = {
                                pos: i,
                                formFlag: false,
                                day: newDay,
                                entries: matchingEntries,
                                total: total,
                                actualWeighin: actualWeighin
                            };

        
                            items.push(item);
                        }
                    }
                }
        
                $scope.calendar = items;
            });
        });

        Items.GetAll().then(function successCallBack(res) {
            $scope.items = res.data || [];
        });
    }

    buildCalendarStructure();

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

}]);