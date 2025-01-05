import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
    const { username } = req.body;
    const url = `https://atcoder.jp/users/${username}`;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const canvas = $('#ratingGraph')[0];

        if (canvas) {
            const canvasData = canvas.toDataURL('image/png');
            res.status(200).json({ imageData: canvasData });
        } else {
            res.status(404).json({ error: 'Canvas要素が見つかりませんでした。' });
        }
    } catch (error) {
        res.status(500).json({ error: 'エラーが発生しました。' });
    }
}