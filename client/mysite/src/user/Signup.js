import React, {useState} from 'react'
import Menu from '../core/Menu'
import {signup} from '../auth'

const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {username, email, password, success, error} = values

    const handleChange = username => event => {
        setValues({...values, error: false, [username]: event.target.value})
    };

    const clickSubmit = async (event) => {
        event.preventDefault();
        setValues({...values, error : false})
        try {
            const data = await signup({username : username, email : email, password : password}) 
            if (data.error) {
                return setValues({...values, error: data.error, success: false})    
            } else {
                return setValues({
                    ...values,
                    username: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }   
        }
        catch (err) {
            console.log(err);
        } 
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const signUpForm = () => (
        <form id="Login">
            {showSuccess()}
            {showError()}
            <label className="control-label">Nom</label>
            <div className="form-group">
                <input onChange={handleChange('username')} type="text" className="form-control" value={capitalize(username)}/>
            </div>
            <label className="control-label">E-mail</label>
            <div className="form-group">
                <input onChange={handleChange('email')} type="text" className="form-control" value={email}/>
            </div>
            <label className="control-label">Mot de passe</label>
            <div className="form-group">
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary btn-lg">S'inscrire</button>    
        </form>
    );
   
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    
    const showSuccess = () => ( 
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
            <p>Votre compte a bien été crée. Vérifiez votre boîte mail pour vous connecter</p>  
        </div>
    )
    
    return (
        <div>
            <Menu/>
            <div id="LoginForm">
                <div className="container">
                    <div className="login-form">
                        <div className="main-div-2">
                            {signUpForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}
export default Signup;