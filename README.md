# README
### Application Description
This is a Recipe Management application that allows users to add, edit, and manage recipes. The application is built using Ruby on Rails and uses a PostgreSQL database for data storage. The frontend is developed using React. The project includes tests to ensure the application runs smoothly and as expected.

### Requirements
* Ruby version: `3.2.2`
* Rails version: `~> 6.1`
* Node.js version: `14.x or higher`
* Yarn version: `1.x or higher`
* PostgreSQL
### System Dependencies
* PostgreSQL
* Node.js (for asset compilation)
* Yarn (for managing JavaScript dependencies)
### Configuration
Clone the repository:
* `git clone <repository_url>`
* `cd <repository_directory>`
### Install required Ruby gems:
* `bundle install`
### Install JavaScript dependencies:
* `yarn install`
### Database Creation
Create and set up the database:
* `rails db:create`
* `rails db:migrate`
### Database Initialization
Seed the database with initial data:
* `rails db:seed`
### How to Run the Test Suite
1. Run the tests:
* `bundle exec rspec`