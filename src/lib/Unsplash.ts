import axios from "axios";

export const getUnsplashImage = async (query: string) => {
    try {
        const { data } = await axios.get(
            `https://api.unsplash.com/search/photos?per_page=1&query=${query}&client_id=${process.env.UNSPLASH_SECRET_KEY}`
        );
        
        if (data.results && data.results.length > 0) {
            return data.results[0].urls.small;
        } else {
            throw new Error('No images found');
        }
    } catch (error) {
        console.error('Error fetching image from Unsplash:', error);
        throw error;
    }
};
