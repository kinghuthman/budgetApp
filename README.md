# budgetApp

MVC DESIGN PATTERN

DATA MODULE

- Add the new item to our data structure
- Calculate budget

UI MODULE

- Get input values
- Add the new item to the UI
- Update the UI

CONTROLLER MODULE (The Place Where We Tell Other Modules What To Do)

- Add event handler

---

MODULE PATTERN

---

Private and public data, encapsulation and separation concerns.

Modules are created to keep pieces of code that are related to one another together, inside of separate, independent, and organized units. In each of these modules, variables and functions will be private and are only accesible inside of the module. This keeps the data and code safe.

Data Encapsulation - Expose methods to the public so other functions or modules can access and use them. AKA an API as only a public interface is exposed, while the implementation details of a specific module are hidden from the outside scope.

IIFE allows to have data privacy because it creates a new scope that is not visible from the outside scope.

The secret of the Module Pattern is that it returns an object containing all
of the functions that we want to be public/give the outside scope access to.

Modules can also receive arguments.

Separation of Concerns - each part of the application should only be interested
in doing one thing independently.

---

---

KEYPRESS EVENTS/EVENT OBJECT

---

Keypress Event is a UI event.
Using the console we can find what our keycode is of the key that was pressed.
keycodes.atjayjo.com for reference

---

---

READING DATA FROM DIFFERENT HTML INPUT TYPES

---

---

INIT

---

Creating a public initialization function to setup private event listeners to make sure they are executed.

---

---

FUNCTION CONSTRUCTORS

---

New keyword creates a new empty object and then calls the function and points to the this keyword of that function to the new object that was created. When properties are set on the this keyword, we automatically set them on the new object that was created.

---

---

AVOID CONFLICTS/PASSING DATA

---

When assigning ID to each new item, conflict will arise if the id is set to next ID, instead of last ID + 1
//[1 2 3 4 5], next ID = 6
//[1 2 4 6 8], next ID = 9
// ID = last ID + 1

Retrieved values inputed with query selectors, and added to the data structure by pushing on the new item as an object with properties(using a constructor) with a push method

---

---

DOM MANIPULATION

---

insertAdjacentHTML can be used to update values within the dom. For this app, this was helpful, as I retrieved the data by setting the inputted info from the UI controller's getInput method to a newItem variable in the global controller. newItem uses addItem, a public method from the budget controller that adds the newItem to the data structure as an object using a constructor. This newItem is passed as an object in the addListItem method(from UI controller) and a type is retrieved from the input that was set thanks to the getInput method, all in the global controller. From there we have all of the necessary info from the object and type to update the proper placeholders and insert the new information using the insertAdjacentHTML method.

---

---

CLEAR INPUT FIELD/LIST, LOOPS, ARRAYS

---

querySelectorAll method returns a list.

Use the call method to pass in the list as a variable to trick the method slice into thinking that the list is an array.
Array.prototype.slice.call(list)

forEach method loops over an array, able to pass a cb function that has 3 arguments. the first argument is the current element in the array, the second is the index of where that element is, and the third argument is the array itself.

---

---

CONVERT FIELD INPUTS TO NUMBERS/PREVENT FALSE INPUTS

---

Use parseFloat( ) to convert the value returned as a string into a number.

If statement to prevent false inputs

---

---

REUSABLE FUNCTIONS / SUM ELEMENTS OF ARRAY WITH FOREACH

---

---

DOM MANIPULATION

---

---

EVENT DELEGATION

---

Event Bubbling - when an event is triggered on a DOM element, then the exact same event is also triggered on all of the parent elements. "The event bubbles up inside the DOM tree."

Element that caused the event to happen is the target element.

Event Delegation - attach an event handler to a parent element and wait for the event to bubble up from the target element and then do whatever was intended to the target element.

    Use cases for event delegation, when we have an element with lots of child elements that we are interested in. Add event handler to parent element and then determine on which child element the event was fired.

    Second use case, when we want want an event handler attached to an element that is not yet in the DOM when our page is loaded.

Dom Traversing - use .parentNode

---

---

DELETE FROM THE DATA STRUCTURE

---

Must find the index of the id we are looking to delete
Can use the map method on a list of arrays to return a new array with a certain property or new property we are looking for or wanting to create, then we can use indexOf on that new array to find a specific index for an id in that list.
Then use the splce method with that index.
