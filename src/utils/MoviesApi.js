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

    getMovies() {
        return this._doRequest(`${this._baseUrl}/beatfilm-movies`, {
            method: "GET",
        });
    }
}

export const moviesApi = new Api({
    baseUrl: apiURL.moviesApiUrl,
});
