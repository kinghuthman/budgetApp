// BUDGET CONTROLLER
// handles budget data, IIFE
var budgetController = (function() {
  // Choosing to create objects because there will be lots of expenses
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
})();

// UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  return {
    getInput: function() {
      return {
        // will be either inc or exp
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    //exposing the DOMstring Object into the public
    getDOMStrings: function() {
      return DOMstrings;
    }
  };
})();

// GLOBAL APP CONTROLLER
// receives budgetController and UIController as arguments
// different name for convenience
// controller knows and can use the other two modules code
// control what happens to each event, then delegate tasks to the controllers
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    // don't need the class because the keypress happens on the global page
    document.addEventListener('keypress', function(event) {
      // older browsers use .which and don't have the keycode property
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    // 1. Get the input data
    var input = UICtrl.getInput();
    console.log(input);

    // 2. Add the item to the budget controller

    // 3. Add the item to the UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI
  };

  return {
    // runs event listnerers
    init: function() {
      console.log('App has started.');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

// runs the application
controller.init();
