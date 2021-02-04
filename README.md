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

<img width="1258" alt="Screen Shot 2021-01-15 at 10 01 12 AM" src="https://user-images.githubusercontent.com/53250186/104671370-a12f5f00-5718-11eb-9046-8b9877d8b2be.png">

---
Profile page

<img width="1296" alt="Screen Shot 2021-01-15 at 9 57 43 AM" src="https://user-images.githubusercontent.com/53250186/104671251-662d2b80-5718-11eb-8f5a-70a3359c4f24.png">

---
Product page

![Screen Shot 2021-02-03 at 10 57 22 AM](https://user-images.githubusercontent.com/53250186/106691542-a5abb100-660e-11eb-8370-743a4e29a3fe.png)


---
Admin page

<img width="1307" alt="Screen Shot 2021-01-15 at 9 59 27 AM" src="https://user-images.githubusercontent.com/53250186/104671242-61687780-5718-11eb-8886-3412b37ec2b7.png">

## Features
- RWD
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
- WishList

#### Admin
- Carousel management 
- Account management (edit user profile, delete user)
- Product management (create prodcut, edit product including upload image, delete product)
- Order management (update order as delivered)

#### Optimization
- Add react-virtualized and intersection observer to comment section
- Cancel the request while component is unmounted
- Lazy loading depending on routes

#### TODO
- [ ] Test (frontend)
- [ ] Delete order
- [ ] Delete comment

## Technologies

Client
- react
- redux + redux thunk
- react-bootstrap
- formik + yup

Server
- nodejs (express)
- mongodb (mongoose)

## Obstacles
#### Q: Cancel api requests while the component is unmounted    
A: There are several ways to handle async actions for redux, such as redux-thunk or redux-observable, and more. To address this problem, my first thought is that I need to cancel api requests in the cleanup function of useEffect life cycle hook. As redux-thunk was already used as redux middleware in this project, now I just pick the most straightforward but cluttered way, which is passing the cancel token as an argument to action creators and invoke cancel method in cleanup function of useEffect. However this implementation definitely can be improved.

#### Q: Should I put the logic in action creator or reducer?
A: According to redux documentation, "trying to put as much of the logic for calculating a new state into the appropriate reducer, rather than in the code that prepares and dispatches the action" is recommended.

#### Q: Implement react-virtualized and intersection observer
A: This two packages are perfect for optimizing performance issue. There is a strange issue of react-virtualized, while scrolling in some point of time, the rows on the top will disappear.

## Usage

In the root and client directory, to install all the dependencies, you should respectively run:

#### `npm install`

In the root directory, you can run:

#### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
