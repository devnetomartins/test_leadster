import axios from 'axios'

export default class Client {
  constructor(){
    return axios.create({
        baseURL: "http://viacep.com.br/",
        timeout: 4000})
  }
}
