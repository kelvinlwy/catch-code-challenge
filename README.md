## Catch.com.au Code Challenge

### Challenge Overview

Create a single page to list out products what can be sorted by price.

The product item view should display price, retail price, and state if the item is out of stock or not.

### Prerequisite

* The page should be written in React.
* Free to choose any state management.
* Products must be retrieved from http://catch-code-challenge.s3-website-ap-southeast-2.amazonaws.com/challenge-3/response.json

### Mockup 

![Page mockup](https://github.com/kelvinlwy/catch-code-challenge/blob/master/challenge/mockup.png)

### Get started

#### System Requirements

* [Node.js](https://nodejs.org/en/), a Javascript runtime environment for building server-side web applications.
  * To download Node.JS, check out the options [here](https://nodejs.org/en/download/).
* [Yarn](https://classic.yarnpkg.com/en/), a dependency manager
  * You can install yarn by following the options [here](https://classic.yarnpkg.com/en/docs/install).

#### Installation 

* To get the application by clone the repo via

```
$ git clone git@github.com:kelvinlwy/catch-code-challenge.git
```

* Then go the project root directory and install all dependencies via running the command line ```yarn install``` or ```npm install```.

#### Run it locally

```
$ yarn start
```

### Project Structure Overview

This challenge focuses on retrieving products list from static json file stored remotely in AWS S3 bucket.

#### Fetching data using custom hook

To fetch the data, a custom hook is in use to perform http get request to get the data.
The custom fetch hook provide functions to perform the stateful logic including request initialisation, callback on success, and callback on error.

#### State management using React Context and useReducer

To manage the state related to products, I am using React Context in conjunction with React useReducer for simple state management. 
The useReducer can handle state transitions by providing dispatch method to update state. 
The second part of the state management is using React Context to pass state and the dispatch function down the component tree without using props.

#### Components

I have broken down the page into several components as small as possible. 
This approach is to make sure all individual components have single responsibility. This makes each component much easier to test. 
