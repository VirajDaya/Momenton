# Introduction
This is a simple CLI application to show hierarchical employee structure of a company.
The data is stored in the ["data/employees.json"](./data/employees.json) file.

- Known Limitations
    - Doesn't handle circular references between employee and manager.
    - If the manager is a not valid, then the employee is considered to have no manager

## Getting Started
This is a NodeJS application, and requires Node Package Manager (NPM) to install dependencies and run the application.
  - ### Install Node and NPM
    Follow instructions in here to install NodeJS and 
    NPM https://nodejs.org/en/download/
  - ### Install Node Modules
    Once NodeJS and NPM is installed, run following command to install the packages required for the application.

    `npm install`

## Running Application
Once required packages are installed, you can execute following command to execute the application.

  `npm run start`

## Running Tests
To run unit tests for the application, please execute following command

  `npm run tests`

## Additional Commands
Following additional commands are available with the application

- Run eslint

    `npm run lint`

