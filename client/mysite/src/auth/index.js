import { API_URL } from "../config"

export const signup = async user => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return response.json();
    }
    catch (err) {
        console.log(err);
    }
};

export const signin = async user => {
    try {
        const response = await fetch(`${API_URL}/signin`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return response.json();
    }
    catch (err) {
        console.log(err);
    }
};

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem ('jwt', JSON.stringify(data))
        next();   
    }
};

export const signout = async (next) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem ('jwt')
        next(); 
        try {
            const response = await fetch(`${API_URL}/signout`, {
                method: "GET",
            });
            console.log('signout', response);
        }
        catch (err) {
            return console.log(err);
        }
    }   
};

export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false    
    } 
    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false;
    }
}