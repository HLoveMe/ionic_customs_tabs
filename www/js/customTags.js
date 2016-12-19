/**
 * Created by zhuzihao on 2016/12/16.
 */
angular.module("HW.tags", [])
  .factory("$tabItemPool", function () {
    var pool = {
      datas: [],
      count: function () {
        return pool.datas.length
      },
      currnt: {},
      status: {},//color imgsize font-size,action
      addItem: function (item) {
        pool.datas.push(item)
      },
      getItem: function (index) {
        if (typeof index != 'number') {
          index = 0;
        }
        return pool.datas[index]
      }
    };
    return pool
  })

  .directive("tabsMenu", function ($tabItemPool) {
    return {
      restrict: "EA",
      template: '<div ng-style="cus_tabs" ng-controller="$tabsCtrl"><span ng-transclude></span></div>',
      repalce: true,
      transclude: true,
      scope: {
        height: "@",
        bgColor: "@",
        bgImage: "@",
        normalColor: "@",
        selectColor: "@",
        iconW: "@",
        iconH: "@",
        iconTop: "@",
        fontSize: "@",
        action: "&"
      },
      link: function (scope, element, attrs) {
        if (typeof scope.height == "undefined") {
          scope.height = "49px"
        }
        if (typeof scope.bgColor == "undefined") {
          scope.bgColor = "rgb(248,248,248)"
        }
        if (typeof scope.normalColor == "undefined") {
          scope.normalColor = "#000000"
        }
        if (typeof scope.selectColor == "undefined") {
          scope.selectColor = "#f00"
        }
        if (typeof scope.iconW == "undefined") {
          scope.iconW = "28px"
        }
        if (typeof scope.iconH == "undefined") {
          scope.iconH = "28px"
        }
        if (typeof scope.iconTop == "undefined") {
          scope.iconTop = "4px"
        }
        if (typeof scope.fontSize == "undefined") {
          scope.fontSize = "10px"
        }
        $tabItemPool.status = {
          color: {
            normalColor: scope.normalColor,
            selectColor: scope.selectColor
          },
          imgSize: {
            W: scope.iconW,
            H: scope.iconH,
            Top: scope.iconTop
          },
          fontSize: scope.fontSize,
          action: scope.action
        };
        scope.cus_tabs = {
          "position": "absolute",
          "margin": "0px",
          "padding": "0px",
          "width": "100%",
          "z-index": "10",
          "bottom": "0px",
          "border-top-style": "solid",
          "border-top-width": "1px",
          "border-color": "rgba(200,200,200,1.0)"
        }

        var ele = element[0].getElementsByTagName("div")[0]
        ele.style.height = scope.height
        if (typeof scope.bgImage != "undefined") {
          ele.style.backgroundColor = "#ffffff"
          ele.style.backgroundImage = "url(" + "'./img/tabbar.png'" + ")"
          ele.style.backgroundAttachment = "fixed"
        } else {
          ele.style.backgroundColor = scope.bgColor
        }


        ionic.DomUtil.ready(function () {
          var count = $tabItemPool.count();
          for (var i = 0; i < count; i++) {
            var data = $tabItemPool.getItem(i);
            var button = data.button;
            button.style.width = (100 / count).toString() + "%";
          }
          data = $tabItemPool.getItem(0);
          //处理默认选择
          scope.$broadcast("$tabsClick", data._scope);
        })

      }
    }
  })
  .controller("$tabsCtrl", function ($scope, $rootScope,$tabsStatus, $tabItemPool, $ionicTabsDelegate, $state) {
    $scope.statusArr = $tabsStatus;
    $rootScope.$on("$ionicView.beforeEnter", function (event, data) {
      // var ions = document.getElementsByTagName("ion-nav-view")
      // for (var i = 1; i < ions.length; i++) {
      //   var one = ions[i]
      //   console.log(one.getElementsByTagName("ion-view")[0])
      //   var stutaName = one.getElementsByTagName("ion-view")[0].getAttribute("state")
      //   if(-1 == $scope.statusArr.indexOf(stutaName))
      //     $scope.statusArr.push(stutaName)
      // }
      // console.log($scope.statusArr)
      // console.log($state.current)
      var name = $state.current.name
      var index = $scope.statusArr.indexOf(name)
      if (index != -1) {
        change($tabItemPool.getItem(index)._scope)
      }
    });

    function change(cu_data) {
      var count = $tabItemPool.count();
      var norC = $tabItemPool.status.color.normalColor;
      var selC = $tabItemPool.status.color.selectColor;
      var norS = cu_data.normalSrc;
      var selS = cu_data.selectSrc;

      for (var i = 0; i < count; i++) {
        var data = $tabItemPool.getItem(i);
        var button = data.button;
        button.style.width = (100 / count).toString() + "%";
        //设置统一样式
        button.style.color = norC;
        button.getElementsByTagName("img")[0].src = norS;
      }

      // console.log(cu_data.index)
      var more = $tabItemPool.getItem(cu_data.index);
      $tabItemPool.currnt = cu_data;
      button = more.button;
      button.style.color = selC;
      button.getElementsByTagName("img")[0].src = selS;



    }

    $scope.$on("$tabsClick", function (event, cu_data) {
      if(cu_data!=$tabItemPool.currnt){
        $ionicTabsDelegate.select(cu_data.index)
        change(cu_data)
      }
      $tabItemPool.status.action()
      event.preventDefault()
    })
  })
  .directive("tabItem", function ($tabItemPool) {
    return {
      restrict: "EA",
      template: '<button class="col" ng-style="cus_tab" ng-click="buttonClick($event)"> <div ng-style="tab_row01"> <img   ng-style="tab_img"> </div> <div ng-style="tab_row02"> <span ng-style="tab_title">{{title}}</span> </div></button>',
      repalce: true,
      scope: {
        title: "@",
        normalSrc: "@",
        selectSrc: "@"
      },
      link: function (scope, element, attrs) {
        var button = element[0].getElementsByTagName('button')[0];
        scope.index = $tabItemPool.count();
        $tabItemPool.addItem({
          button: button,
          _scope: scope
        });

        if (typeof scope.title == "undefined") {
          scope.title = "title"
        }

        scope.cus_tab = {
          "height": "100%",
          "margin": "0px",
          "padding": "0px",
          "background-color": "rgba(1,1,1,0)",
          "float": "left",
          "border": "0px"
        };
        scope.tab_row01 = {
          "width": "100%",
          "height": "65%",
          "text-align": "center"
        };
        scope.tab_row02 = {
          "width": "100%",
          "height": "35%",
          "text-align": "center"
        };
        scope.tab_title = {
          "font-size": "10px",
          "vertical-align": "super"
        };
        scope.tab_img = {
          "width": "28px",
          "height": "28px",
          "margin-top": "4px"
        };


        ionic.DomUtil.ready(function () {
          top = $tabItemPool.status.imgSize.Top;
          H = $tabItemPool.status.imgSize.H;
          W = $tabItemPool.status.imgSize.W;

          font = $tabItemPool.status.fontSize;
          var span = button.getElementsByTagName("span")[0];
          span.style.fontSize = font

          var img = button.getElementsByTagName("img")[0];
          img.style.width = W;
          img.style.height = H;
          img.style.marginTop = top;
        });

        scope.buttonClick = function ($event) {
          scope.$emit("$tabsClick", scope)
        };
      }
    }
  });
