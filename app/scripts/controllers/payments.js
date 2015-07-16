'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:BooksCtrl
 * @description
 * # BooksCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('PaymentsCtrl', ['$location', 'Job_', '$scope', '$firebaseArray', 'firebasePath', 'user', 'fbMethods', function ($location, Job_, $scope, $firebaseArray, firebasePath, user, fbMethods) {

  var ref = new Firebase (firebasePath + '/payments');

  var COST = '1';
  var USD_TO_RMB = 6.2;
  var USD = '1';
  var RMB = '0';
  var REVENUE = '0';
  var TRANSFER = '2';

  $scope.totalCost = 0;
  $scope.totalRevenue = 0;
  $scope.totalProfits = 0;
  $scope.grossInvestment = 0;

  // return total cost / total revenue in RMB
  ref.on('value', function(snapshot) {
    snapshot.forEach(function(eachChild) {

      var amt = eachChild.val().amount;
      var type = eachChild.val().paymentType;
      var investRate = ( parseFloat(eachChild.val().reinvestmentRate) / 100);

      // total cost
      if(type === COST) {       
        amt = eachChild.val().currency === RMB ? amt : Math.round(amt * USD_TO_RMB);
        $scope.totalCost += amt;
      }

      // total revenue
      // careful -- these are not set up to convert from usd
      else if(eachChild.val().paymentType === REVENUE) {
        $scope.totalRevenue += amt;
        $scope.grossInvestment += (amt * investRate);
      }

      // total invested
      $scope.totalInvested = ( ($scope.totalRevenue - $scope.totalCost) * 0);
    })
  })



  // some checking to see if costs, revenue, investment, profits line up



  $scope.paymentsIn = $firebaseArray(ref.orderByChild('paymentType').equalTo(REVENUE));
  $scope.paymentsOut = $firebaseArray(ref.orderByChild('paymentType').equalTo(COST));
  $scope.transfers = $firebaseArray(ref.orderByChild('paymentType').equalTo(TRANSFER));


  // want to remap this array of payments so that there is a job title associated with the id

  $scope.paymentsIn.$loaded().then(function(items) {
    var newmapping = 
      items.map(function(eachItem) {

        // associate each job with a job titles
        if(eachItem.job) {
          var newJob = Job_(eachItem.job);
          newJob.$loaded().then(function(job) {
            eachItem.jobtitle = job.title;
          })
        }

        // calculate gross and net savings
        if(eachItem.paymentType === REVENUE) {
          
          var savings = 0, 
              liability = 0,
              profit = 0,
              amt = parseFloat(eachItem.amount), 
              savingsRate = parseFloat(eachItem.reinvestmentRate) / 100;


           if(eachItem.liability) {

              var perUnitLiability = parseFloat(eachItem.liability.unitCost),
                  numLiabilities = parseFloat(eachItem.liability.unitNum);

              liability = perUnitLiability * numLiabilities;
              eachItem.liabilityAmt = liability;

           } 

          savings = (amt - liability) * savingsRate;
          eachItem.savings = savings;

          profit = amt - liability - savings;
          eachItem.profit = profit;

        }

        return eachItem;
      });
  });


  var jobsRef = new Firebase (firebasePath + '/jobs');

  $scope.getJobTitle = function(id) {
    var job = new Job_(id);
    job.$loaded().then(function(j) {
      return j.title;
    })
  }; 

  $scope.selectedItems = [];
   $scope.focusinControl = {
    selectedItems: [],
    collection: $scope.items
  }; 

  $scope.addItem = function() {
   $scope.items.$add({
    whenAdded: fbMethods.getTime(),
    whenModified: fbMethods.getTime()
  }).then(function(ref) {
    $location.path('/paymentsEdit/' + ref.key());
  });
 };

}]);
