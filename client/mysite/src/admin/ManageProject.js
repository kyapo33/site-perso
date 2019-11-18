import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getPojects} from '../core'
import {deleteProject} from '../admin'

const ManageProject = () => {

    const [project, setProject] = useState([])

    const {user, token} = isAuthenticated()

    const loadProjects = async () => {
        try {
            const data = await getPojects('createdAt'); 
            if(data.error) {
                return console.log(data.error)
            } else {
                return setProject(data)
            }
        }
        catch (err) {
            console.log(err);
        }  
    }

    const destroy = async (slug) => {
        try {
            const data = await deleteProject(user._id, slug, token);
            if(data.error) {
                console.log(data.error)
            } else {
                loadProjects()
            }
        }
        catch (err) {
            console.log(err);
        }     
    }

    useEffect(() => {
        loadProjects()
    }, [])

    const deleteConfirm = slug => {
        let answer = window.confirm('voulez vous supprimer ce projet ?');
        if (answer) {
            destroy(slug);
        }
    };

    return (
        <div>
            <Menu/>
            <h2 className="jumbotron">Gérer les Projets</h2>
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {project.map((p,i) => (
                            <li key={i} className="list-group-item d-flex justify-content-center align-items-center">
                                <strong>{p.title}</strong><p className="post-meta"></p>
                                <Link to={`/edit/project/${p.slug}`}>
                                    <span className="badge-warning badge-pill badge">Mettre à jour</span>
                                </Link>
                                <span onClick={() => deleteConfirm(p.slug)} style= {{color: "white", cursor: "pointer"}} className="badge-danger badge-pill badge">Supprimer</span>
                            </li>
                        ))}
                    </ul>   
                </div>
            </div>
        </div>
    );
}

export default ManageProject;