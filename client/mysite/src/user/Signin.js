import React ,{useState}from 'react'
import Menu from '../core/Menu'
import {Redirect} from 'react-router-dom'
import {signin, authenticate, isAuthenticated} from '../auth'

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, loading, error, redirectToReferrer} = values
    const {user} = isAuthenticated();

    const handleChange = email => event => {
        setValues({...values, error: false, [email]: event.target.value})
    };

    const clickSubmit = async (event) => {
        event.preventDefault();
        setValues({...values, error : false, loading: true})
        try {
            const data = await signin({email : email, password : password})
            if (data.error) {
                return setValues({...values, error: data.error, loading: false})    
            } else {
                authenticate (data, ()=> {
                    return setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });    
            }   
        }
        catch (err) {
            console.log(err);
        }   
    };

    const signInForm = () => (
        <form id="Login">           
            {showLoading()}
            {showError()}
            <div className="form-group">
                <input onChange={handleChange('email')} type="text" className="form-control" id="inputEmail" placeholder="Email" value={email}/>
            </div>
            <div className="form-group">
                <input onChange={handleChange('password')} type="password" className="form-control"  id="inputPassword" placeholder="Mot de passe" value={password}/>
            </div> 
            <button onClick={clickSubmit} className="btn btn-primary">Se Connecter</button><br/>              
        </form>
    );
   
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    
    const showLoading = () => ( 
        loading && (
        <div className="alert alert-info">
            <h2>Chargement...</h2>  
        </div>
        )
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if(user && user.role === 1) {
                return <Redirect to = '/admin/dashboard'/>   
            } else {
                return <Redirect to = '/user/dashboard' />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to = '/'/>
        }
    }
    
    return (
        <div>
            <Menu/>
            <div id="LoginForm">
                <div className="container">
                    <div className="login-form">
                        <div className="main-div">
                            {signInForm()}
                            {redirectUser()}
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
}

export default Signin;