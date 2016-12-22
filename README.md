# React File Upload Form Application

This application is written in React and tried to copy the functionality of the
Angular 2 front end that is located in the fileupload-demo-angular2 project.

This application is paired with a Spring Framework Rest Controller back end
to persist the uploaded file and metadata (found in the fileupload-demo-backend repository).


## Running the React front end

Prior to running the application, you need to start the back-end web service
(see Readme.md in the fileupload-demo-backend repository).

**NOTE:** This application was created with the [create-react-app](https://github.com/facebookincubator/create-react-app) utility.

```bash
# clone this repo
$ git clone https://github.com/cdoremus/fileupload-demo-react.git

# change directory
$ cd fileupload-demo-react

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

The application should then be running at [http://localhost:3000](http://localhost:3000).

See the fileupload-demo-angular2 project for details on the application structure and requirements implementation.

## Unit tests
Unit test were created with Jest. They are located in each component's folder with a .test.js extension.
Run them using the following commands:
```bash
# run tests
npm test
# to run in watch mode, select 'a' when the Jest command-line interface is launched

# run tests with a code coverage report
npm test -- --coverage
```
## Improvements
There are improvements that need to be done in this project:
* End-to-end tests need to be implemented
* No About page is shown or navigation demonstrated


## Acknowlegements

This project used the [create-react-app](https://github.com/facebookincubator/create-react-app) starter.
