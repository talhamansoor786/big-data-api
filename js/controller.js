app.controller("controller", ['$scope', '$http', '$location', '$timeout', '$rootScope', function($scope, $http, $location, $timeout, $rootScope){

	$http({
		method:'GET',
		url:'assets/data.json',
		transformRequest: angular.identity
	}).then(function successCallBack(response){
			$scope.datas = response.data;
			$scope.newArr = new Array();
			var x = 0;
			$scope.newArr[x] = [];
			for (var index = 0; index < $scope.datas.length; index += $scope.pageSize) {
				myChunk = $scope.datas.slice(index, index+$scope.pageSize);
				$scope.newArr.push(myChunk);
			}
			$scope.data = $scope.newArr[$scope.pn];
			$scope.pageNumber = $scope.newArr.length;
			var z = 0;
			while(z<$scope.newArr.length-1){
				$scope.numberFunc.push(z);
				z++;
			}
	}, function errorCallBack(response){

	});
	var myChunk;
	$scope.pageSize = 10;
	$scope.numberFunc = new Array();

	$scope.pn = 1;
	$scope.goToPage = function(pn){
		if(pn == 'next'){
			$scope.pn++;
			$scope.data = $scope.newArr[$scope.pn];
			return false;
		}
		if(pn == 'prev'){
			$scope.pn--;
			$scope.data = $scope.newArr[$scope.pn];
			return false;
		}
		$scope.pn = pn;
		$scope.data = $scope.newArr[$scope.pn];
	}

	$('table').on('click', '.click-cl', function(){
		$(this).parent().parent('tr').next().find('.modal-h').slideToggle();
	});

}]);