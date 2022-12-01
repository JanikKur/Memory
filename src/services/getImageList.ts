import axios from "axios";

export default function getImageList(length: number) {
    return axios.get(`https://picsum.photos/v2/list?page=1&limit=${length}`).then(res => res.data.map((elem: any) => elem.download_url))
}