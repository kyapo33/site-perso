import { API_URL } from "../config"

export const getPojects = async () => {
    try {
        const response = await fetch(`${API_URL}/project`, {
            method: "GET",
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
}

export const getResume = async () => {
    try {
        const response = await fetch(`${API_URL}/resume`, {
            method: "GET",
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
}

export const singleProject = async (slug) => {
    try {
        const response = await fetch(`${API_URL}/project/${slug}`, {
            method: "GET",
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};

export const singleResume = async (slug) => {
    try {
        const response = await fetch(`${API_URL}/resume/${slug}`, {
            method: "GET",
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }
};

export const sendContact = async data => {
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    catch (err) {
        return console.log(err);
    }    
}