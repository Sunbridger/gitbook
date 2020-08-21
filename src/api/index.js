import axios from 'axios';

const getTestData = (data) => {
    return axios({
        method: 'get',
        url: 'https://mock.souche-inc.com/mock/5f17f3a058207567647e473b/example/getinfo',
        data
    });
}

export default {
    getTestData
};
