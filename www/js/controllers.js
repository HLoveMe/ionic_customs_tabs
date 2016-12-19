/**
 * Created by zhuzihao on 2016/12/15.
 */

angular.module("HW.controller", [])
  .controller("MainCtrl",function ($scope,$ionicTabsDelegate,$tabItemPool,$timeout,$state,$tabsStatus) {
      $scope.cli=function () {
          console.log($ionicTabsDelegate.selectedIndex())


      }
    $scope.previous = ""
    $scope.$on("$ionicView.beforeEnter",function(event,data){
      var name = $state.current.name
      if($tabsStatus.indexOf(name)!=-1){
        $scope.hideTabs = false
        $scope.previous = name
      }else{
        if(name == $scope.previous){
          // $scope.hideTabs = false
          $scope.previous = ""
        }else{
          $scope.hideTabs = true
          $scope.previous = name
        }
      }
    })

    $scope.$on("$ionicView.enter",function(event,data){
      var name = $state.current.name
      if($tabsStatus.indexOf(name)!=-1){
        $scope.hideTabs = false
      }else{
        $scope.hideTabs = true
      }
    })

  })
  .controller("offerCtrl", function ($scope,$state,$timeout,$tabItemPool) {
        $scope.goTo = function () {
          $state.go("tab.offer2")
        }
  })
  .controller("offerCtrl2", function ($timeout,$tabItemPool) {

  })
  .controller("dccCtrl", function () {

  })

  .controller("billCtrl", function () {

  })

  .controller("allowanceCtrl", function ($state,$timeout) {
        // $timeout(function () {
        //     $state.go("tab.allow",{reload:true})
        //   console.log(11111)
        // },2000)
  })
