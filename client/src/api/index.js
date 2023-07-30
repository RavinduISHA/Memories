import axios from 'axios';

const API  = axios.create({ baseUrl: 'http://localhost:5000'})

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => axios.patch(`/posts/${id}`, updatedPost);

export const signIn = (formData) => API.post('./user/signin', formData);
export const signUp = (formData) => API.post('./user/signup', formData);
