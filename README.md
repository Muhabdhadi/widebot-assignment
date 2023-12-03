# WidebotAssignment

This is a project for a simple user management app. built as an assignment for widebot company

## Angular Version
This angular application uses angular version 16.2.0

## Node Version
application build using node version 18.18.1

## Application credentials

**admin user:**
username: admin
password: admin

**non-admin user**
username: mohamed
password: mohamed




## Application Features
1- Add Users
2- Update user
3- Edit user
4- delete a user when confirming the delete action
4- when the user is an admin, you can display the application as a non-admin user
5- support two languages ( Arabic and English)
6- route guards for all routes 

## Application Structure

this application contains 3 modules:

- **Admin**:
- **Users**:
- **Login**

**Admin Module**:
this module responsible for all admin-related components, services, and functionalities

it has 3 components each has its responsibility.

Users: display all lists of users
user-modal: create or update users
confirmation-modal: delete a user but display a confirmation popup first


**Users**:
this module responsible for all non-admin related components, services, and functionalities

it has one component.

**Profile**: responsible for displaying and updating user profile information.


**Guards**:
the application uses 3 activated guards:

1- **Admin guard**: only active route when the user role is admin
2- **User guard**: only active route when the role is user
3- **Auth guard**: only active route when the user is logged in


**Localization**:
The app has 2 languages, Arabic and English 

implementing localization using ngx-translate
