import store from '@/main';

export default class AbstractAbcService {
  constructor() {
    if (this.constructor === AbstractAbcService) {
      throw new TypeError(
        'Abstract class "AbstractAbcService" cannot be instantiated directly'
      );
    }
  }

  model;
  entityRoute;

  getConfig(options = undefined) {
    const token = (store.state.user && store.state.user.token) ? store.state.user.token : "";
    return {
      baseURL: process.env.VUE_APP_API_URL,
      headers: { Authorization: "Bearer " + token },
      params: {
        ...options
      }
    };
  }

  doRequest(promise, onSuccess, onFail, onDone) {
    promise
      .then(response => {
        onSuccess(response.response.data);
      })
      .catch(error => {
        console.error(error);
        let message = "An errored occured, please try again later.";
        let code = null;
        if (error.response && error.response.data) {
          if (error.response.data.message)
            message = error.response.data.message;
          if (error.response.data.httpCode) 
            code = error.response.data.httpCode;
        }
        onFail(message, code);
      })
      .finally(() => {
        if(onDone != null && onDone != undefined)
          onDone()
      });
  }

  doGet(url, onSuccess, onFail, onDone, options = undefined) {
    let promise = this.model.api().get(url, this.getConfig(options))
    this.doRequest(promise, onSuccess, onFail, onDone);
  }

  doPost(data, url, onSuccess, onFail, onDone, options = undefined) {
    let promise = this.model.api().post(url, data, this.getConfig(options))
    this.doRequest(promise, onSuccess, onFail, onDone);
  }

  doPut(data, url, onSuccess, onFail, onDone, options = undefined) {
    let promise = this.model.api().put(url, data, this.getConfig(options))
    this.doRequest(promise, onSuccess, onFail, onDone);
  }

  doDelete(url, onSuccess, onFail, onDone, options = undefined) {
    let promise = this.model.api().delete(url, this.getConfig(options))
    this.doRequest(promise, onSuccess, onFail, onDone);
  }

  getById(id, onSuccess, onFail, onDone, options) {
    this.doGet(this.entityRoute + "/" + id, onSuccess, onFail, onDone, options);
  }

  getAll(onSuccess, onFail, onDone, options) {
    this.doGet(this.entityRoute + "/", onSuccess, onFail, onDone, options);
  }

  create(data, onSuccess, onFail, onDone, options) {
      this.doPost(data, this.entityRoute + "/", onSuccess, onFail, onDone, options);
  }
}
