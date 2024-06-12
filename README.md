# Getting Started
Install the dependencies and run the project in watch mode
```
npm install
npm run build # or watch to rebuild on change
open index.html
```
## DJS09 Documentation
# Project Documentation

## Overview

## Rough Loom Videos(there was noise on campus I will record another one tonight):https://www.loom.com/share/b8b13d3367e14dbbbacf1bc4a6216bac?sid=6ef7c1ba-5c8c-405c-9bff-756541207e6d

## Continuation : https://www.loom.com/share/0e052b1809684fbfa23ffa995091852e?sid=96882bde-8afa-4f38-9abb-6063fc7804ff

This project is a TypeScript-based application designed to manage property listings and user reviews. It demonstrates various TypeScript features, including enums, interfaces, and classes, along with DOM manipulation and event handling in a web environment. The primary goal of this application is to display property listings, manage user reviews, and handle user permissions and loyalty levels effectively. This documentation will provide an in-depth explanation of the code, including how each part of the code functions and how it contributes to the overall application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Modules](#modules)
  - [Enums](#enums)
  - [Interfaces](#interfaces)
  - [Functions](#functions)
- [DOM Manipulation](#dom-manipulation)
- [Classes](#classes)
- [Example Data](#example-data)
- [Detailed Code Explanation](#detailed-code-explanation)
  - [Enums](#enums)
  - [Interfaces](#interfaces)
  - [Functions](#functions)
  - [DOM Manipulation](#dom-manipulation)
  - [Classes](#classes)

## Installation

To set up this project locally, follow these steps:

    git clone https://github.com/yourusername/your-repo-name.git  
    cd your-repo-name
    npm install
    ```

This will install all the necessary dependencies required for the project to run. Make sure you have Node.js and npm installed on your system before proceeding with the installation.

## Types file
The project contains a type file with values that are fixed. 

```typescript
export type Price = 25 | 30 | 35 | 45
export type Country = 'Colombia' | 'Poland' | 'United Kingdom' | 'Malaysia'
```
In this code snippet Price and Country can only accept the values outlines in the type definition.If any other values is assigned it throws an error.


## Modules

The project is divided into several modules, each serving a specific purpose. These modules include enums, interfaces, and functions which are imported and exported.

### Enums

Enums are a way to define a set of named constants in Typescript that can be used to represent a collection of related values. Enums make the code more readable and maintainable by providing descriptive names instead of arbitrary values.

#### Permissions
- **`Permissions`** an enum that defines two permission levels:
  - `ADMIN`: Represents administrative privileges. Users with this permission level have full access to all functionalities.
  - `READ_ONLY`: Represents read-only access. Users with this permission level can view content but cannot make any changes.

The `Permissions` enum is used throughout the application to control access to various features based on the user's permission level.

#### LoyaltyUser

```typescript
export enum LoyaltyUser {
    GOLD_USER = 'GOLD_USER',
    SILVER_USER = 'SILVER_USER',
    BRONZE_USER = 'BRONZE_USER'
}
```

- **`LoyaltyUser`** enum defines three levels of user loyalty:
  - `GOLD_USER`: Highest loyalty level. Users with this level are considered premium users and may receive additional benefits.
  - `SILVER_USER`: Intermediate loyalty level. Users with this level are considered regular users with some benefits.
  - `BRONZE_USER`: Basic loyalty level. Users with this level are new or infrequent users with basic access.

The `LoyaltyUser` enum is used to categorize users based on their loyalty status, which can influence how their reviews are displayed or how they interact with the application.

### Interfaces

Interfaces in TypeScript define the structure of an object, ensuring that the object adheres to a specific shape. This helps in maintaining consistency and type safety and error handling across the application.

#### Review
- **`Review`** interface defines the structure of a review object:
  - `name`: The name of the reviewer.
  - `stars`: The star rating given by the reviewer, typically ranging from 1 to 5.
  - `loyaltyUser`: The loyalty level of the reviewer, represented by the `LoyaltyUser` enum.
  - `date`: The date when the review was made.

#### Property

```typescript
export interface Property {
    image: string;
    title: string;
    price: Price; //accessed the type Price with fixed values
    location: {
        firstLine: string;
        city: string;
        code: number | string;
        country: Country;
    };
    contact: [number, string];
    isAvailable: boolean;
}
```


The `Property` interface ensures that all property objects have a consistent structure, making it easier to manage and display properties in the application.

### Functions

The utility functions in the utility function file are used to perform various operations, such as displaying review totals, populating user information, showing property details, and sorting reviews in this project.

#### Function 1: showReviewTotal

- **Purpose**: Displays the total number of reviews and the name of the last reviewer.
- **Parameters**:
  - `value`: The total number of reviews.
  - `reviewer`: The name of the last reviewer.
  - `isLoyalty`: The loyalty level of the reviewer, represented by the `LoyaltyUser` enum.
- **Implementation**:
  - The function checks if the loyalty level is `GOLD_USER` and sets an icon (`⭐`) accordingly.
  - It updates the `reviewTotalDisplay` element's inner HTML with the review count, reviewer name, and icon.

This function is used to update the review total display dynamically based on the provided parameters.

#### Function 2:populateUser

- **Purpose**: Populates user information based on their return status.
- **Parameters**:
  - `isReturning`: A boolean indicating if the user is returning.
  - `userName`: The name of the user.
- **Implementation**:
  - If the user is returning, it updates the `returningUserDisplay` element's inner HTML with the text 'back'.
  - It updates the `userNameDisplay` element's inner HTML with the user's name.

This function is used to personalize the user experience by displaying the user's name and return status.

## Function 3 : showDetails

- **Purpose**: Displays property price details if the user has the required permissions.
- **Parameters**:
  - `value`: A boolean or `Permissions` enum indicating if the details should be shown.
  - `element`: The HTML element where the details should be displayed.
  - `price`: The price of the property.
- **Implementation**:
  - If the `value` parameter evaluates to true (indicating that the user has the required permissions) or if it's a `Permissions` enum that evaluates to true, the function creates a new `div` element to display the price details.
  - It sets the inner HTML of the created `div` element with the property price followed by '/night'.
  - It appends the created `div` element to the specified `element`.

This function is used to dynamically display property price details based on user permissions.

#### Function 4: getTopTwoReviews
- **Purpose**: Retrieves the top two reviews based on star rating.
- **Parameters**:
  - `reviews`: An array of review objects.
- **Implementation**:
  - It sorts the array of reviews in descending order based on the star rating.
  - It selects the top two reviews using the `slice` method.
  - It returns an array containing the top two reviews.

This function is used to get the top two reviews from the provided array, which can then be displayed prominently in the application.

#### Function 5: Add Reviews 

```typescript
let count = 0;
function addReviews(array: Review[]): void {
    if (!count) {
        count++;
        const topTwo = getTopTwoReviews(array);
        for (let i = 0; i < topTwo.length; i++) {
            const card = document.createElement('div');
            card.classList.add('review-card');
            card.innerHTML = topTwo[i].stars + ' stars from ' + topTwo[i].name;
            reviewContainer.appendChild(card);
        }
        container.removeChild(button);
    }
}
button.addEventListener('click', () => addReviews(reviews));
```

This function demonstrates how to dynamically update the DOM based on user interaction, such as clicking a button.

### Classes

Classes are used to create objects with properties and methods, providing a blueprint for creating multiple instances of similar objects.

#### MainProperty

```typescript
class MainProperty {
    src: string;
    title: string;
    reviews: Review[];

    constructor(src: string, title: string, reviews: Review[]) {
        this.src = src;
        this.title = title;
        this.reviews = reviews;
    }
}
```
This class can be used to create instances of properties with associated reviews, allowing for more structured data management.

#### Example Instance
- **Purpose**: Creates an instance of the `MainProperty` class and adds its image to the DOM.
- **Implementation**:
  - It creates a new instance of `MainProperty` with the specified image URL, title, and an array containing one review.
  - It selects the `mainImageContainer` element in the DOM.
  - It creates a new `img` element and sets its `src` attribute to the property image URL.
  - It appends the `img` element to the `mainImageContainer`.

### Example Data

Example data is provided to simulate real-world scenarios and demonstrate the functionality of the application this is hardcoded static data.


