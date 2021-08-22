import axios from 'axios';

const commonUrl = 'http://localhost:9090';

const scheduleFind = (data:Record<string, unknown>) => {
  return axios.post(`${commonUrl}/scheduleFind`,  data );
};


const scheduleAdd = (data:Record<string, unknown>) => {
  return axios.post(`${commonUrl}/scheduleAdd`,  data );
};



export {scheduleFind,scheduleAdd};
