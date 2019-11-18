import React, {useState, Fragment} from 'react'
import Menu from '../core/Menu'
import {sendContact} from '../core'

const Contact = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: '',
        error: '',
        success: false
    })

    const {name, email, message, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    };

    const clickSubmit = async (event) => {
        event.preventDefault();
        setValues({...values, error : false})
        try {
            const data = await sendContact({name : name, email : email, message : message})
            if (data.error) {
                return setValues({...values, error: data.error, success: false})    
            } else {
                return setValues({
                    ...values,
                    name: '',
                    email: '',
                    message: '',
                    error: '',
                    success: true
                })
            }
        }
        catch (err) {
            console.log(err);
        } 
    } 
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error} 
        </div>
    )
    
    const showSuccess = () => ( 
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
            <p>Votre message a été envoyé</p> 
        </div>
    )
    
    const contactForm = () => (
        <div className="col-md-12 col-md-offset-2">
            <h2 className="centered">N'hésitez pas à me contacter</h2>
            {showSuccess()}
            {showError()}
            <form className="contact-form mt-5">
                <div className="form-group">
                    <input onChange={handleChange('name')} type="text" className="form-control" placeholder="Nom" value={name}/>
                </div>
                <div className="form-group">
                    <input onChange={handleChange('email')} type="text" className="form-control" placeholder="E-mail" value={email}/>
                </div>
                <div className="form-group">
                    <textarea onChange={handleChange('message')} className="form-control" id="exampleFormControlTextarea1" rows="3" value={message}></textarea>
                </div>
                <button type="submit" onClick={clickSubmit}  className="btn btn-info">Envoyez</button>
            </form>
        </div>       
    );

    const showHeader = () => {
        return (
            <Fragment>
                <div id="contactwrap">
                    <div className="container">
                    </div>
                </div>
            </Fragment>
        )
    }
   
    return (
        <div>
            <Menu/>
            {showHeader()}
            <div id="contact">
                <div className="container">
                    <div className="row">
                        {contactForm()}
                    </div>
                </div>
            </div>
        </div>         
    );
}

export default Contact;