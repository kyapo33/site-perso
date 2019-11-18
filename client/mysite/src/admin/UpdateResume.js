import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth';
import {editResume} from '.';
import {FormText, Label, Button, Form, FormGroup, Input} from 'reactstrap';
import {singleResume} from '../core'

const UpdateResume = ({match}) => {

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: '',
        body: ''
    });

    const { error, success, formData, title } = values;

    const loadResume = async (slug) => {
        try {
            const data = await singleResume(slug);
            if(data.error) {
                return console.log(data.error)
            } else {
                setValues({...values, title: data.title, formData: new FormData() });
            }
        }
        catch (err) {
            console.log(err);
        }   
    }

    useEffect(() => {
        loadResume(match.params.slug)
        setValues({...values, formData: new FormData()});
    // eslint-disable-next-line 
    }, []);

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
    };

    const {user, token} = isAuthenticated();

    const update = async (e) => {
        e.preventDefault();
        const data = await editResume(user._id, match.params.slug, formData, token, );
        if (data.error) {
            setValues({ ...values, error: data.error });
        } else {
            setValues({ ...values, title: data.title, success: `L'article "${data.title}" a bien été modifié` });
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
            <Form className="" onSubmit={update} >
                <FormGroup>
                    <Input type="text" onChange={handleChange('title')} name="title" placeholder="Title" value={title} />
                </FormGroup>
                <FormGroup>
                    <Label className="btn btn-outline-info">
                        Ajouter une image
                        <Input onChange={handleChange('photo')} type="file" accept="pdf/image/*" hidden />
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
            <h2 className="jumbotron">Modifier le projet</h2>
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

export default UpdateResume;