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

  var USD_TO_RMB = 6.2,
      USD = '1',
      RMB = '0',
      REVENUE = '0',
      COST = '1',
      TRANSFER = '2';

  $scope.totalCost = 0;
  $scope.totalRevenue = 0;
  $scope.totalProfits = 0;
  $scope.totalLiabilities = 0;
  $scope.totalSavings = 0;
  $scope.netSavings = 0;


  $scope.payments = $firebaseArray(ref);
  $scope.paymentsIn = $firebaseArray(ref.orderByChild('paymentType').equalTo(REVENUE));
  $scope.paymentsOut = $firebaseArray(ref.orderByChild('paymentType').equalTo(COST));
  $scope.transfers = $firebaseArray(ref.orderByChild('paymentType').equalTo(TRANSFER));
  $scope.other = $firebaseArray(ref.orderByChild('paymentType').equalTo(null));

  // remap revenue payments to calculate per payment and total:
  // revenue, liability, savings, profit
  // as well as adding a title to each job
  $scope.paymentsIn.$loaded().then(function(items) {

      items.map(function(eachItem) {

        // associate each job with a job titles
        if(eachItem.job) {
          var newJob = Job_(eachItem.job);
          newJob.$loaded().then(function(job) {
            eachItem.jobtitle = job.title;
          })
        }

        
        var savings = 0, 
            liability = 0,
            profit = 0,
            amt = parseFloat(eachItem.amount), 
            savingsRate = parseFloat(eachItem.reinvestmentRate) / 100;
            $scope.totalRevenue += amt;


         if(eachItem.liability) {

            var perUnitLiability = parseFloat(eachItem.liability.unitCost),
                numLiabilities = parseFloat(eachItem.liability.unitNum);

            liability = perUnitLiability * numLiabilities;              
            eachItem.liabilityAmt = liability;
            $scope.totalLiabilities += liability;
        }           

          savings = (amt - liability) * savingsRate;
          eachItem.savings = savings;
          $scope.totalSavings += savings;

          profit = amt - liability - savings;
          $scope.totalProfits += profit;
          eachItem.profit = profit;        

        return eachItem;
      });
  });

  // remap cost payments to calculate total costs
  $scope.paymentsOut.$loaded().then(function(items) {
    items.map(function(eachItem) {
      var amt = parseFloat(eachItem.amount);
      $scope.totalCost += amt;
    })
  })

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
    collection: $scope.payments
  }; 

  $scope.addItem = function() {
   $scope.payments.$add({
    whenAdded: fbMethods.getTime(),
    whenModified: fbMethods.getTime()
  }).then(function(ref) {
    $location.path('/paymentsEdit/' + ref.key());
  });
 };

}]);
