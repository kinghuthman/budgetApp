// handles budget data, IIFE

var budgetController = (function () {
    var x = 23;

    var add = function (a) {
        return x + a;
    }
    return {
        publicTest: function (b) {
            return (add(b));
        }
    }
})();

// user interface

var UIController = (function () {

})();

// receives budgetController and UIController as arguments
// different name for convenience 
// controller knows and can use the other two modules code
var controller = (function (budgetCtrl, UICtrl) {
    // variable so it can be accessed to the outside through a method
    var z = budgetCtrl.publicTest(5);

    // method that is exposed to the public
    return {
        anotherPublicTest: function () {
            console.log(z)
        }
    }

})(budgetController, UIController);