import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth';
import {editProject} from '.';
import {FormText, Label, Button, Form, FormGroup, Input} from 'reactstrap';
import ReactQuill from 'react-quill';
import {singleProject} from '../core'

const UpdateProject = ({match}) => {

    const [body, setBody] = useState('');
    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: '',
        body: ''
    });

    const { error, success, formData, title } = values;

    const loadProject = async (slug) => {
        try {
            const data = await singleProject(slug);
            if(data.error) {
                return console.log(data.error)
            } else {
                setValues({...values, title: data.title, formData: new FormData() });
                return setBody(data.body);
            }
        }
        catch (err) {
            console.log(err);
        }   
    }

    useEffect(() => {
        loadProject(match.params.slug)
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
    };

    const {user, token} = isAuthenticated();

    const update = async (e) => {
        e.preventDefault();
        const data = await editProject(user._id, match.params.slug, formData, token, );
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

    const newProjectForm = () => ( 
        <div className="" >
            <Form className="" onSubmit={update} >
                <FormGroup>
                    <Input type="text" onChange={handleChange('title')} name="title" placeholder="Title" value={title} />
                </FormGroup>
                <FormGroup>
                    <ReactQuill onChange={handleBody} modules={UpdateProject.modules} formats={UpdateProject.formats} value={body} />
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
            <h2 className="jumbotron">Modifier le projet</h2>
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

UpdateProject.modules = {
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
 
UpdateProject.formats = [
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


export default UpdateProject;