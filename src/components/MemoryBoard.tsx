import React from 'react'
import { MemoryItem } from '../App'
import Card from './Card'

type Board = {
    values: MemoryItem[];
    handleClick: (idx: number) => void
}


export default function MemoryBoard({ values, handleClick }: Board) {

    return (
        <div className="board">
            {values.map((value, idx) => <Card key={idx} value={value} onClick={handleClick} />)}
        </div>
    )
}
