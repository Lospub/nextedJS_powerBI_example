import axios from 'axios';

const getAccessToken = async () => {
    try {
        // 请求 Next.js 的 API 路由来获取 Power BI 嵌入令牌
        const response = await axios.post('/api/getPowerBIEmbedToken');
        return response.data.token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw new Error('Failed to fetch access token');
    }
};

export default getAccessToken;
