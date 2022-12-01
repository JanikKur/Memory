import React from 'react'
import { MemoryItem } from '../App'

export default function Card({ value, onClick }: { value: MemoryItem, onClick: (idx: number) => void }) {

    function isOpen() {
        return value.isOpen || value.isFound
    }

    return (
        <div className={`card ${isOpen() ? 'open' : ''}`} onClick={() => !value.isFound && onClick(value.idx)} >{isOpen() && (value.imageUrl ? <img className="card-img" src={value.imageUrl} /> : value.value)}</div>
    )
}
