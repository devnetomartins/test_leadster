import axios from 'axios'

const baseUrl = document.getElementsByName('url_base')[0].content

export default class Client {
  constructor(){
    return axios.create({
        baseURL: baseUrl,
        timeout: 4000,
        headers: {'X-CSRF-Token': this.getCsrfToken()}})
  }

  getCsrfToken(){
    return document.getElementsByName('csrf-token')[0].content
  }
}
