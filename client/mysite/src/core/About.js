import React, {useState, useEffect, Fragment} from 'react'
import Menu from './Menu'
import {getResume} from '../core'
import { API_URL } from "../config"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"

const About = () => {

    const [resume, setResume] = useState('')

    const loadResume = async () => {
        try {
            const data = await getResume(); 
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
    }, []);

    const showAbout = () => {
        return (
            <Fragment>
               <div id="aboutwrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-lg-offset-3">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row centered mt mb">
                        <div className="col-md-12" >
                            <h2>Qui suis-je ?</h2>
                            <p className="mt-3">Diplômé depuis novembre 2019, je suis un passionné de développement web.
                            Je suis orienté principalement en développement JavaScript avec React.js et Node.js. 
                            Cependant, je sais également utiliser PHP, MySql et travailler avec des CMS comme WordPress. 
                            </p>
                            <p>A travers ce site vous découvrirez les projets que j’ai réalisé. 
                            N’hésitez pas à télécharger mon CV pour y voir mon parcours professionnel. </p>
                            {resume && resume.map((r, i) => (
                            <a key={i} target="_blank" rel="noopener noreferrer" href={`${API_URL}/resume/photo/${r.slug}`}
                            download><button className="btn btn-info mt-3">Télécharger mon CV</button></a>
                            ))} 
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }  
    
    const showSocial = () => {
        return (
            <Fragment>
                <div id="social">
                    <div className="container">
                        <div className="row centered">
                            <div class="col-lg-6">
                            <a target="_blank" rel="noopener noreferrer" href={'//www.linkedin.com/in/kevin-yapo'}><FontAwesomeIcon className="icon" icon={faLinkedin}/></a>
                            </div>
                            <div class="col-lg-6">
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
            {showAbout()}
            {showSocial()}
       </div>
    )
}

export default About;