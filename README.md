# Fast Food Order App

## Introduction

This is a web application project for ordering food from a local fast-food restaurant.

## What Is Implemented

* A module that manages a shopping cart.
* A module that is used to fetch and cache offers from a local server.
* Validation for both sign in and sign up forms.
* Both Most Popular Products and Menu sections display content dynamically, based on data from the server.
* Whole website is fully responsive.

## Technologies

* JSON-Server: I use it as a simple API server to simulate a backend.

* Vanilla JavaScript: I use pure JavaScript to manipulate the DOM, handle events and interact with the JSON-Server.

* HTML/CSS: I use HTML to structure the content on the site, and CSS for styling and layout.

* Node.js: I use Node.js to serve static files such as HTML, CSS and JavaScript.

* Nodemon: I use Nodemon to automatically restart the application server during development.

## How To Run

1. Clone the repository: `https://github.com/Przemigiusz/FastFoodOrderApp.git`
2. Navigate into the project directory: `cd FastFoodOrderApp`
3. Install dependencies: `npm install`
4. Run json-server: `npx json-server db.json`
5. Run main script: `npx nodemon server.js`
6. Open `localhost:5000` in a browser.
