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

  return {
    // allows other modules to add new item into the data structure
    addItem: function(type, des, val) {
      var newItem, ID;
      // unique # assinged to each new item added to inc/exp
      // 1st bracket gets the type, 2nd selects item, .id selects the id property
      // + 1 sets the new id to the next one
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      // allows other module/function to have direct access
      return newItem;
    },
    testing: function() {
      console.log(data);
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
        // type will be either inc or exp
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
    var input, newItem;
    // 1. Get the input data from the UI controller
    input = UICtrl.getInput();
    console.log(input);

    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

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
