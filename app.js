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

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    // -1 is a value that we use to say something is non-existent
    percentage: -1
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
    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // calculate the percentage of income that we spent
      // Expense = 100 and income 200, spent 50% = 100/200 = .5 * 100
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
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
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {
    getInput: function() {
      return {
        // type will be either inc or exp
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    // add item to the dom
    addListItem: function(obj, type) {
      var html, newHtml, element;
      // create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline" /> </button> </div> </div> </div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }
      // replace the placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // insert the html into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    clearFields: function() {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ',' + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);
      /* pass a cb function into the method and then the cb function is applied
       to each of the elements in the array */
      fieldsArr.forEach(function(current, index, array) {
        current.value = '';
      });
      // sets the focus on the first element of the array
      fieldsArr[0].focus();
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

  var updateBudget = function() {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    var budget = budgetCtrl.getBudget();
    // 3. Display the budget on the UI
    console.log(budget);
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the input data from the UI controller
    input = UICtrl.getInput();
    console.log(input);

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear the fields
      UICtrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();
    }
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
