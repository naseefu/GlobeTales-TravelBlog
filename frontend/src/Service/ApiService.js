import axios from "axios";

export default class ApiServices{

  static BASE_URL = "http://localhost:8080"

  static getheaders(){
    const token = localStorage.getItem('token');
    return{
      Authorization:`Bearer ${token}`,
      "Content-Type":"application/json"
    };
  }

  static async registerUser(user,pass){
    const response = await axios.post(`${this.BASE_URL}/auth/register/${pass}`,user)
    return response.data
  }

  static async loginUser(user){
    const response = await axios.post(`${this.BASE_URL}/auth/login`,user)
    return response.data
  }

  static async addBlog(form,id){
    const response = await axios.post(`${this.BASE_URL}/blog/add/${id}`,form,{
      headers: {
          "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }

  static async getAllBlog(num,size){
    const response = await axios.get(`${this.BASE_URL}/blog/all/${num}/${size}`)
    return response.data
  }

  static async getEachBlog(id){
    const response = await axios.get(`${this.BASE_URL}/blog/each/${id}`)
    return response.data
  }

  static async addCommentsToBlog(comment,id){
    const response = await axios.post(`${this.BASE_URL}/blog/comment/${id}`,comment)
    return response.data
  }

  static async getAiSuggestion(content){
    const response = await axios.post(`${this.BASE_URL}/cohere/generate`,content)
    return response.data
  }

  static async getAiSummarize(content){
    const response = await axios.post(`${this.BASE_URL}/cohere/suggestion`,content)
    return response.data
  }

}