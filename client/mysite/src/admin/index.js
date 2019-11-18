import { API_URL } from "../config"

export const createProject = async (userId, project, token) => {
    try {
        const response = await fetch(`${API_URL}/create/project/${userId}`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: project
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};

export const deleteProject = async (userId, slug, token) => {
    try {
        const response = await fetch(`${API_URL}/project/${slug}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};

export const editProject = async (userId, slug, project, token) => {
    try {
        const response = await fetch(`${API_URL}/edit/project/${slug}/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: project
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};

export const createResume = async (userId, resume, token) => {
    try {
        const response = await fetch(`${API_URL}/create/resume/${userId}`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: resume
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};

export const editResume = async (userId, slug, resume, token) => {
    try {
        const response = await fetch(`${API_URL}/edit/resume/${slug}/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: resume
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};

