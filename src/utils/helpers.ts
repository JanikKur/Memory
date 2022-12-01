import { MemoryItem } from "../App";
import getImageList from "../services/getImageList";

export function shuffleValues(values: MemoryItem[]) {
    let j, x, i;
    for (i = values.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = values[i];
        values[i] = values[j];
        values[j] = x;
    }
    return values;
}

export async function createRandomBoard(size: number) {
    let images: string[] = [];
    try {
        images = await getImageList(size)
    } catch (e) {
        images = new Array<string>(size).fill('');
    }
    return shuffleValues(createDuplicates(new Array<MemoryItem>(size).fill({ idx: 0, value: 0, imageUrl: '', isOpen: false, isFound: false }).map((elem, idx) => { elem.value = idx; elem.imageUrl = images[idx]; return { ...elem }; }))).map((elem, idx) => { elem.idx = idx; return { ...elem } });
}

function createDuplicates(values: MemoryItem[]) {
    return [...values, ...values];
}