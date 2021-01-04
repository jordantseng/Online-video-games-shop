# Online video games shop
Online video games shop using MERN stack, including admin dashboard.  
demo: https://e-commerce-20201123.herokuapp.com/
admin account: admin@gmail.com
admin password: 123456

## Table of contents
* [Screenshot](#screenshot)
* [Technologies](#technologies)
* [Features](#features)
* [Obstacles](#obstacles)
* [Usage](#usage)
## Screenshot:
Home page

<img width="1306" alt="Screen Shot 2020-12-08 at 9 44 44 AM" src="https://user-images.githubusercontent.com/53250186/101427542-0a61cc80-393a-11eb-9c47-c273c153f61e.png">

---
Product page

<img width="1284" alt="Screen Shot 2020-12-08 at 9 45 46 AM" src="https://user-images.githubusercontent.com/53250186/101427612-31200300-393a-11eb-874c-2a6ae9b8ce99.png">

---
Admin page

<img width="1254" alt="Screen Shot 2020-12-08 at 9 47 15 AM" src="https://user-images.githubusercontent.com/53250186/101427734-63c9fb80-393a-11eb-85ad-cff4b1df6dec.png">

## Features
- Login / signup (auto send successful registration email)
- Auto login / logout in 1hr (JWT expires in 1hr)
- Show latest products depending on released date 
- Show popular products depending on rating
- Membership (edit user profile, show user orders)
- Search products by name
- Comment product
- Shopping cart
- Payment
- Error and exception handling
- Form Validation

#### Admin
- Carousel management 
- Account management (edit user profile, delete user)
- Product management (create prodcut, edit product including upload image, delete product)
- Order management (update order as delivered)

#### TODO
- Wishlist
- Delete order
- Delete comment

## Technologies

Client
- react
- redux + redux thunk
- react-bootstrap
- formik + yup

Server
- nodejs
- express
- mongodb + mongoose
- sendgrid

## Obstacles
#### Q: Cancel api requests while the component is unmounted    
A: There are several ways to address this problem, such as redux middleware, redux-thunk or redux-observable and more. However, to address this problem, my first thought is that I need to cancel api requests in the cleanup function of useEffect life cycle hook. In this project, redux is used, meaning that api is called in the action creators instead of component. For now, I just pick the most straightforward but cluttered way. I pass the cancel token as an argument to action creators and invoke cancel method in cleanup function of useEffect. This implementation definitely can be improved. I'm  still researching :)


## Usage

In the client and server directory, to install all the dependencies, you should respectively run:

#### `npm install`

In the root directory, you can run:

#### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
