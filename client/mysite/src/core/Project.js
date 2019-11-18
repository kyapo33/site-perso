import React, {useState, useEffect, Fragment} from 'react'
import Menu from './Menu'
import {singleProject} from '../core'
import parse from 'html-react-parser';
import { API_URL } from "../config"

const Single = ({match}) => {
    const [oneProject, setOneProject] = useState({})

    const loadBlog = async (slug) => {
        try {
            const data = await singleProject(slug);
            if(data.error) {
                return console.log(data.error)
            } else {
                return setOneProject({title : data.title, slug: data.slug, body: data.body})
            }
        }
        catch (err) {
            console.log(err);
        }   
    }

    useEffect(() => {
        loadBlog(match.params.slug)
    }, [match.params.slug]);

    const showHeader = () => {
        return (
            <Fragment>
                <div id="workwrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-lg-offset-3">
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    const showBody = () => {
        return (
            <Fragment>
            <section id="works">
                <div className="container">
                    <div className="row centered mt mb">
                        <div className="col-lg-12 col-lg-offset-2">
                            <h4>{oneProject.title}</h4>   
                        </div>
                    </div>
                    <div className="">
                        <p>{parse(`${oneProject.body}`)}</p>
                    </div>
                    <div className="row centered mt mb">
                    <div className="col-md-12 mt">
                        <img className="img-responsive" style={{width: "50%"}} src={`${API_URL}/project/photo/${oneProject.slug}`} alt="project" />
                    </div>   
                    </div>   
                </div>
            </section>
        </Fragment>
        )
    }

    return (
        <div className="">
        <Menu/>
        {showHeader()}
        {showBody()}
        </div>   
    )
}
export default Single;