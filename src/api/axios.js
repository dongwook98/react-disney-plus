import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '5ff293aad6022cc502ea28a0c5c08a80',
    language: 'ko-KR',
  },
});

export default instance;
