import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth';
import {createProject} from '.';
import {FormText, Label, Button, Form, FormGroup, Input} from 'reactstrap';
import ReactQuill from 'react-quill';

const AddProject = () => {
    const retrieveBlog = () => {
        if (typeof window === 'undefined') {
            return false;
        }
        if (localStorage.getItem('project')) {
            return JSON.parse(localStorage.getItem('project'));
        } else {
            return false;
        }
    };
    
    const [body, setBody] = useState(retrieveBlog())
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

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('project', JSON.stringify(e));
        }
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const {user, token} = isAuthenticated();

    const publish = async (e) => {
        e.preventDefault();
        try {
            const data = await createProject(user._id, formData, token); 
            if (data.error) {
                return setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', error: '', success: `Le nouvel article "${data.title}" a été ajouté` });
                setBody('');
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

    const newProjectForm = () => ( 
        <div className="" >
            <Form className="" onSubmit={publish}>
                <FormGroup>
                    <Input type="text" onChange={handleChange('title')} name="title" placeholder="Title" value={capitalize(title)} />
                </FormGroup>
                <FormGroup>
                    <ReactQuill onChange={handleBody} modules={AddProject.modules} formats={AddProject.formats} value={body} />
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
            <h2 className="jumbotron">Ajouter un projet</h2>
            {showError()}
            {showSuccess()}
            <div className = "row ml-2">
                <div className = "col-md-12" > 
                    {newProjectForm()}
                </div>
            </div>
        </div>
    );
}

AddProject.modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      
        [{ 'indent': '-1'}, { 'indent': '+1' }],          
        [{ 'direction': 'rtl' }],                         
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],         
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']             
    ]
};
 
AddProject.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
    'color',
    'background',
    'align'
];


export default AddProject;