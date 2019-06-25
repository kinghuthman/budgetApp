// BUDGET CONTROLLER
// handles budget data, IIFE
var budgetController = (function () {

})();

// UI CONTROLLER
var UIController = (function () {

})();

// GLOBAL APP CONTROLLER
// receives budgetController and UIController as arguments
// different name for convenience 
// controller knows and can use the other two modules code
// control what happens to each event, then delegate tasks to the controllers
var controller = (function (budgetCtrl, UICtrl) {

    var ctrlAddItem = function () {
        // 1. Get the input data

        // 2. Add the item to the budget controller 

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI
        console.log('It works')

    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)
    // don't need the class because the keypress happens on the global page
    document.addEventListener('keypress', function (event) {
        // older browsers use .which and don't have the keycode property
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }

    })

})(budgetController, UIController);