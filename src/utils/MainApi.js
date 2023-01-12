import { apiURL } from "../consts/links";

class Api {
    constructor({ baseUrl   }) {
        this._baseUrl = baseUrl;
    }

    #isOK(res) {
        const status = res.ok;
        const statusMessage = res.status;
        return res.json().then((data) => {
            if (!status) {
                return Promise.reject(
                    `Ошибка: ${statusMessage}; ${data.message}`
                );
            }
            return data;
        });
    }

    _doRequest(url, options) {
        return fetch(url, options).then(this.#isOK);
    }

    getUserInfo(token) {
        return this._doRequest(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        });
    }

    getMovies(token) {
        return this._doRequest(`${this._baseUrl}/movies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        });
    }

    saveMovie(movie, token) {
        return this._doRequest(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(movie),
        });
    }

    setUserInfo(email, name, token) {
        return this._doRequest(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        });
    }

    deleteMovie(movieId, token) {
        return this._doRequest(`${this._baseUrl}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        });
    }

    signIn(password, email) {
        return this._doRequest(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        });
    }

    signUp (password, email, name) {
        return this._doRequest(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email,
                name: name,
            }),
        });
    }

}

export const mainApi = new Api({
    baseUrl: apiURL.mainApiUrl,
});
