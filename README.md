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
