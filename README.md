# React File Upload Form Application

This application is written in React and tried to copy the function of the
Angular 2 front end that is located in the dotsub-fileupload-frontend project.

This application is paired with a Spring Framework Rest Controller back end
to persist the uploaded file and metadata (found in the dotsub-fileupload-backend repository).

## Running the React front end

Prior to running the application, you need to start the back-end web service
(see Readme.md in the dotsub-fileupload-backend repository).

```bash
# clone this repo
$ git clone https://github.com/cdoremus/dotsub-fileupload-frontend-react.git

# change directory
$ cd dotsub-fileupload-frontend-react

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

The application should then be running at [http://localhost:3000](http://localhost:3000).

See the dotsub-fileupload-frontend project for details on the application structure and requirements implementation.

## Improvements
There are improvements that need to be done in this project:
* The FileDataList component needs to be moved into the App component container
* Unit and end-to-end tests need to be implemented
* No About page is shown or navigation demonstrated


## Acknowlegements

This project used the [create-react-app](https://github.com/facebookincubator/create-react-app) starter.
