import config from '../config';
import TokenService from './token-service';

const dashboardApiService = {

  getLanguage(user) {
    fetch(`${config.API_ENDPOINT}/language`, {
      method: "GET",
      header: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    });
  }

};

export default dashboardApiService;