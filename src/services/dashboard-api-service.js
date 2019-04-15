import config from '../config';
import TokenService from './token-service';

const dashboardApiService = {

  getLanguage() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      method: "GET",
      header: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }

};

export default dashboardApiService;