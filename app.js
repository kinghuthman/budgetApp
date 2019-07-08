// BUDGET CONTROLLER
// handles budget data, IIFE
var budgetController = (function() {
  // Choosing to create objects because there will be lots of expenses
  var Expense = function(id, description, value, percentage) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  // always need the totalIncome to calculate percentage
  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
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
    deleteItem: function(type, id) {
      var ids, index;

      // id = 6
      // data.allItems[type][id]
      // ids = [1,2,4,6,8]
      // index = 3

      // map method iterates over each element and returns a new array
      // current is any name we choose to represent our property
      var ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      // indexOf method retuns the index number of the element of the array
      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
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

    calculatePercentages: function() {
      data.allItems.exp.forEach(function(current) {
        current.calcPercentage(data.totals.inc);
      });
    },
    // map returns something forEach does not
    getPercentages: function() {
      var allPerc = data.allItems.exp.map(function(current) {
        return current.getPercentage();
      });
      return allPerc;
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
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };
  var formatNumber = function(num, type) {
    var numSplit, int, dec, type;
    /*
    + or - before number
    exactly 2 decimal points
    comma separating the thousands

    2310.4567 -> + 2,310/46
    2000 -> + 2,000
    */

    num = Math.abs(num);
    //toFixed is a method of the num prototype
    num = num.toFixed(2);

    numSplit = num.split('.');

    int = numSplit[0];
    if (int.length > 3) {
      // substr returns the part of the string needed/wanted
      // first element is where to start, second is how many characters
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }
    dec = numSplit[1];

    type === 'exp' ? (sign = '-') : (sign = '+');

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
  };

  var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
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
          '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline" /> </i></button> </div> </div> </div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }
      // replace the placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value));

      // insert the html into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    // selectorID is received from the global controller 'itemID'
    deleteListItem: function(selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(document.getElementById(selectorID));
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
    // obj - where all of the data is stored
    displayBudget: function(obj) {
      obj.budget > 0 ? (type = 'inc') : (type = 'exp');
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        'inc'
      );
      document.querySelector(
        DOMstrings.expenseLabel
      ).textContent = formatNumber(obj.totalExp, 'exp');
      document.querySelector(DOMstrings.percentageLabel).textContent =
        obj.percentage;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },
    displayPercentages: function(percentages) {
      // returns a nodeList
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      // for loop that in each iteration is gonna to call the callback function

      nodeListForEach(fields, function(current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '---';
        }
      });
    },
    displayMonth: function() {
      var now, year, month, monthNumber;
      // with object constructors need to use the new keyword
      now = new Date();
      // now inherits a bunch of methods from the Date prototype
      months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
      monthNumber = now.getMonth();
      month = months[monthNumber];
      year = now.getFullYear();
      document.querySelector(DOMstrings.dateLabel).textContent =
        month + ' ' + year;
    },
    changeType: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          ',' +
          DOMstrings.inputDescription +
          ',' +
          DOMstrings.inputValue
      );
      nodeListForEach(fields, function(current) {
        current.classList.toggle('red-focus');
      });
      document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
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
    // Event Delegation attached to the parent element of inc and exp to delete
    document
      .querySelector(DOM.container)
      .addEventListener('click', ctrlDeleteItem);

    document
      .querySelector(DOM.inputType)
      .addEventListener('change', UICtrl.changeType);
  };

  var updateBudget = function() {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    var budget = budgetCtrl.getBudget();
    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };
  var updatePercentages = function() {
    // 1. Calculate the percentages
    budgetCtrl.calculatePercentages();
    // 2. Read percentages from the budget controller
    var percentages = budgetCtrl.getPercentages();
    // 3. Update the UI with the new percentages
    UICtrl.displayPercentages(percentages);
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

      // 6. Calculate and update percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;
    // not a big deal this is hardcoded as the html is hardcoded
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      //inc-1
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. Delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);

      // 2. Delete the item from the UI
      UICtrl.deleteListItem(itemID);

      // 3. Update and show the new budget
      updateBudget();

      // 4. Calculate and update percentages
      updatePercentages();
    }
  };

  return {
    // runs event listnerers
    init: function() {
      console.log('App has started.');
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0
      });
      setupEventListeners();
    }
  };
})(budgetController, UIController);

// runs the application
controller.init();
