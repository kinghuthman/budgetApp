# budgetApp

MVC DESIGN PATTERN

DATA MODULE

- Add the new item to our data structure
- Calculate budget

UI MODULE

- Get input values
- Add the new item to the UI
- Update the UI

CONTROLLER MODULE

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

---

Separation of Concerns - each part of the application should only be interested
in doing one thing independently.

---

KEYPRESS EVENTS/EVENT OBJECT

---
