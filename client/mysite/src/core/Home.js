import React, {useState, useEffect, Fragment} from 'react'
import Menu from './Menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"
import {getPojects} from '../core'
import { API_URL } from "../config"
import {Link} from "react-router-dom"
import banner from '../img/straws.png';


const Home = () => {

    const [projects, setProjects] = useState('')

    const loadProjects = async () => {
        try {
            const data = await getPojects('createdAt'); 
            if(data.error) {
                return console.log(data.error)
            } else {
                return setProjects(data)
            }
        }
        catch (err) {
            console.log(err);
        }  
    }

    useEffect(() => {
        loadProjects()
    }, []);

    const showHeader = () => { 
        return (
            <div id="headerwrap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-lg-offset-3">
                        <h4>HELLO PEOPLE, MY NAME IS</h4>
                        <h1>KEVIN YAPO</h1>
                        <h4>Développeur Web</h4>
                    </div>    
                </div>   
            </div>
        </div>
        )
    } 

    const showWorks = () => {
        return (
            <Fragment>
                <section id="works">
                <div className="container">
                    <div className="row centered mt mb">
                        <h1 className="col-md-12 projet-titre" >MES PROJETS RÉALISÉS</h1>
                        {projects && projects.map((p, i) => (
                            <div key={i}  className="col-lg-6 gallery">
                            <Link to={`/project/${p.slug}`}><img style={{width: '80%', height: "300px", cursor: 'pointer'}} src={`${API_URL}/project/photo/${p.slug}`} className="img-responsive mt-5" alt="project" /></Link>   
                        </div>   
                        ))}
                    </div>
                </div>
                </section>
            </Fragment>
        )
    }

    const showSocial = () => {
        return (
            <Fragment>
                <div id="social" style={{backgroundImage: `url(${banner})`}} >
                    <div className="container">
                        <div className="row centered">
                            <div className="col-lg-6">
                            <a target="_blank" rel="noopener noreferrer" href={'//www.linkedin.com/in/kevin-yapo'}><FontAwesomeIcon className="icon" icon={faLinkedin}/></a>
                            </div>
                            <div className="col-lg-6">
                            <a target="_blank" rel="noopener noreferrer" href={'//github.com/kyapo33/'}><FontAwesomeIcon className="icon" icon={faGithub}/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    return (
        <div>
            <Menu/>
            {showHeader()}
            {showWorks()}
            {showSocial()}
       </div>
    )
}

export default Home;