import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth';
import {createResume} from '.';
import {FormText, Label, Button, Form, FormGroup, Input} from 'reactstrap';

const AddResume = () => {
    
    const [values, setValues] = useState({
        error:'',
        success:'',
        formData:'',
        title:'',
    })

    const {error, success, formData, title} = values

    useEffect(() => {
        setValues({...values, formData: new FormData()});
    // eslint-disable-next-line 
    }, []);

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const {user, token} = isAuthenticated();

    const publish = async (e) => {
        e.preventDefault();
        try {
            const data = await createResume(user._id, formData, token); 
            if (data.error) {
                return setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', error: '', success: `Le nouvel Cv "${data.title}" a été ajouté` });
            } 
        }
        catch (err) {
            return console.log(err);
        }
    };
       
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const newResumeForm = () => ( 
        <div className="" >
            <Form className="" onSubmit={publish}>
                <FormGroup>
                    <Input type="text" onChange={handleChange('title')} name="title" placeholder="Title" value={capitalize(title)} />
                </FormGroup>
                <FormGroup>
                    <Label className="btn btn-outline-info">
                        Ajouter une image
                        <Input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                        <FormText>Taille maximum 1 Mo</FormText>
                    </Label>
                </FormGroup>
                <Button color="info">Publier</Button>
            </Form>
        </div>
    )
    
    return (
        <div>
            <Menu/>
            <h2 className="jumbotron">Ajouter un Cv</h2>
            {showError()}
            {showSuccess()}
            <div className = "row ml-2">
                <div className = "col-md-12" > 
                    {newResumeForm()}
                </div>
            </div>
        </div>
    );
}

export default AddResume;