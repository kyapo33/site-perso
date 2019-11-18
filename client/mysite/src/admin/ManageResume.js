import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import {Link} from 'react-router-dom';
import {getResume} from '../core'

const ManageResume = () => {

    const [resume, setResume] = useState([])

    const loadResume = async () => {
        try {
            const data = await getResume('createdAt'); 
            if(data.error) {
                return console.log(data.error)
            } else {
                return setResume(data)
            }
        }
        catch (err) {
            console.log(err);
        }  
    }

    useEffect(() => {
        loadResume()
    }, [])

    return (
        <div>
            <Menu/>
            <h2 className="jumbotron">Gérer Mon cv</h2>
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {resume.map((r,i) => (
                            <li key={i} className="list-group-item d-flex justify-content-center align-items-center">
                                <strong>{r.title}</strong><p className="post-meta"></p>
                                <Link to={`/edit/resume/${r.slug}`}>
                                    <span className="badge-warning badge-pill badge">Mettre à jour</span>
                                </Link>
                            </li>
                        ))}
                    </ul>   
                </div>
            </div>
        </div>
    );
}

export default ManageResume;