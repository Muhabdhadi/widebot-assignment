# WidebotAssignment

This is a project for a simple user management app. built as an assignment for widebot company

## Angular Version
This angular application uses angular version 16.2.0

## Node Version
application build using node version 18.18.1

## Application credentials

**admin user:** <br>
username: admin <br>
password: admin

**non-admin user** <br>
username: mohamed <br>
password: mohamed




## Application Features
1- Add Users <br>
2- Update user <br>
3- Edit user <br>
4- delete a user when confirming the delete action <br>
4- when the user is an admin, you can display the application as a non-admin user <br>
5- support two languages ( Arabic and English) <br>
6- route guards for all routes <br>

## Application Structure

this application contains 3 modules:

- **Admin**:
- **Users**:
- **Login**

**Admin Module**:
this module responsible for all admin-related components, services, and functionalities

it has 3 components each has its responsibility.

Users: display all lists of users <br>
user-modal: create or update users <br>
confirmation-modal: delete a user but display a confirmation popup first <br>


**Users**:
this module responsible for all non-admin related components, services, and functionalities

it has one component.

**Profile**: responsible for displaying and updating user profile information.


**Guards**:
the application uses 3 activated guards:

1- **Admin guard**: only active route when the user role is admin <br>
2- **User guard**: only active route when the role is user <br>
3- **Auth guard**: only active route when the user is logged in <br>


**Localization**:
The app has 2 languages, Arabic and English 

implementing localization using ngx-translate
