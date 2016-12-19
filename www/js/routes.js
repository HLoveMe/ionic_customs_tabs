/**
 * Created by zhuzihao on 2016/12/15.
 */

angular.module("HW.rotues", [])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/tab/offer")

    $stateProvider
      .state("tab", {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      .state("tab.offer", {
        url: "/offer",
        views: {
          "tab-offer": {
            templateUrl: "templates/offer.html",
            controller: "offerCtrl"
          }
        }
      })
      .state("tab.offer2",{
        url:"/offer2",
        views: {
          "tab-offer": {
            templateUrl: "templates/offer2.html",
            controller: "offerCtrl2"
          }
        }
      })
      .state("tab.dcc", {
        url: "/dcc",
        views: {
          "tab-dcc": {
            templateUrl: "templates/dcc.html",
            controller: "dccCtrl"
          }
        }
      })

      .state("tab.billing",{
        url:"/billing",
        views:{
          "tab-billing":{
            templateUrl:"templates/billing.html",
            controller: "billCtrl"
          }
        }
      })

      .state("tab.allow", {
        url: "/allowance",
        views: {
          "tab-allowance": {
            templateUrl: "templates/allowance.html",
            controller: "allowanceCtrl"
          }
        }
      })
  })
