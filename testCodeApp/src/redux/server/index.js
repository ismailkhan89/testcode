import api from './api';

const defaultOptions = {
  url: 'https://www.minzaiwelfare.org/testcode_server/public/api',
  root_path:'',
  root_media_path: ''
};

class Server {
   
  setOptions() {   
    this.configuration = { ...defaultOptions};
    this.api = api(this);
    this.root_path = `api${this.configuration.root_path}`;
    this.root_media_path = `/public/images/${this.configuration.root_media_path}`;
    this.base_url = this.configuration.url;
  }

  post(path, params ) {
    return this.send(path, 'POST', null, params);
  }

  put(path, params ) {
    return this.send(path, 'PUT', null, params);
  }

  get(path, params, data ) {
    return this.send(path, 'GET', params, data);
  }

  delete(path, params ) {
    return this.send(path, 'DELETE', params, null);
  }

  send(url, method, params, data) {
  let uri = `${this.base_url}${url}`;

    if (params) {
      let separator = '?';
      Object.keys(params).forEach(key => {
        uri += `${separator}${key}=${params[key]}`;
        separator = '&';
      });
    }
    const missingFields = uri.match(/(\{[a-zA-Z0-9_]+\})/g);
    if (missingFields && missingFields.length > 0) {
      return Promise.reject(
        `URL missing parameters: ${missingFields.join(', ')}`
      );
    }

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    if(this.access_token){
      headers.Authorization = `Bearer ${this.access_token}`;
    }
    
    return new Promise((resolve, reject) => {
      fetch(uri, { method, headers, body: JSON.stringify(data) })
      .then(response => {
        return response.json();
      })
        .then(responseData => {
          resolve(responseData);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }


  setAccessToken(token) {
    this.access_token = token;
  }
  
}

export const server = new Server();