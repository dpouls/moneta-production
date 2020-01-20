import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authentication from './Components/Authentication/Authentication';
import Customers from './Components/Customers/Customers'; 
import Checkout from './Components/Employee/Checkout/Checkout'; 
import Transactions from './Components/Admin/Transactions';

import AddProduct from './Components/Admin/AddProduct';
import EditProducts from './Components/Admin/EditProducts';
import DeleteProduct from './Components/Admin/DeleteProduct';
import AddEmployee from './Components/Admin/AddEmployee';
import DeleteEmployee from './Components/Admin/DeleteProduct';

export default (
    <Switch>
        <Route exact path='/' component={Authentication} />
        <Route path='/customers' component={Customers} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/transactions' component={Transactions} />
        
        {/* ----------Admin Panel Routes---------- */}

        <Route path='/addproduct' component={AddProduct} />
        <Route path='/editproducts' component={EditProducts} />
        <Route path='/deleteproduct' component={DeleteProduct} />
        <Route path='/addemployee' component={AddEmployee} />
        <Route path='/deleteemployee' component={DeleteEmployee} />
    </Switch>
);