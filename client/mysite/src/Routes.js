import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './core/Home'
import About from './core/About'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Contact from './core/Contact'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import AddProject from './admin/AddProject'
import ManageProject from './admin/ManageProject'
import UpdateProject from './admin/UpdateProject'
import Project from './core/Project'
import ManageResume from './admin/ManageResume'
import AddResume from './admin/AddResume'
import UpdateResume from './admin/UpdateResume'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component= {Home}/>
                <Route path = "/about" exact component= {About}/>
                <Route path = "/signup" exact component= {Signup}/>
                <Route path = "/signin" exact component= {Signin}/>
                <Route path = "/project/:slug" exact component= {Project}/>
                <Route path = "/contact" exact component= {Contact}/>
                <AdminRoute path = "/admin/dashboard" exact component= {AdminDashboard}/>
                <AdminRoute path = "/create/project" exact component= {AddProject}/>
                <AdminRoute path = "/manage/project" exact component= {ManageProject}/>
                <AdminRoute path = "/edit/project/:slug" exact component= {UpdateProject}/>
                <AdminRoute path = "/manage/cv" exact component= {ManageResume}/>
                <AdminRoute path = "/add/cv" exact component= {AddResume}/>
                <AdminRoute path = "/edit/resume/:slug" exact component= {UpdateResume}/>
            </Switch>
        </BrowserRouter>
    );     
    
};

export default Routes;