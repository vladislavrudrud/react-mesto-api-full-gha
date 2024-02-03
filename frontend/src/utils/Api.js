class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _response(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Произошла ошибка: ${response.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._response);
  }

  getProfile() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  setProfile(obj) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        about: obj.about,
      }),
    });
  }

  addNewCard(obj) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        link: obj.link,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
    } else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
    }
  }

  setAvatar(obj) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: obj.avatar,
      }),
    });
  }
}

export { Api }
