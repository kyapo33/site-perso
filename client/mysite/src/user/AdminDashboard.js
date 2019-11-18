import React from 'react';
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom'

const AdminDashboard = () => {
    const {user: {
            username, 
            email,
            role
        }} = isAuthenticated();
    
    const AdminLinks = () => {
        return (
            <div className = "card">
                <h4 className ="card-header">Administration</h4>
                <ul className = "list-group">
                    <Link className = "nav-link" to="/add/cv">Ajouter un cv</Link>
                    <Link className = "nav-link" to="/manage/cv">Mon cv</Link>
                    <Link className = "nav-link" to="/create/project">Ajouter un projet</Link>
                    <Link className = "nav-link" to="/manage/project">Gérer mes projets</Link>
                </ul>     
            </div>
        )    
    };

    const AdminInfo = () => {
        return (
            <div className = "card mb-5">
                <h3 className = "card-header">Mes Informations</h3> 
                <ul className = "list-group">
                    <li className = "list-group-item">{username}</li>
                    <li className = "list-group-item">{email}</li>
                    <li className = "list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
                </ul>     
            </div>
        )
    };

    return ( 
        <div>
            <Menu/>
            <h2 className="jumbotron">Bienvenue {username}</h2>
            <div className = "row">
                <div className = "col-md-3" >
                    {AdminLinks()}
                </div>
                <div className = "col-md-9" >
                    {AdminInfo()} 
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;
