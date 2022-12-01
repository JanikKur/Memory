import { useEffect, useState } from "react";
import MemoryBoard from "./components/MemoryBoard";
import { createRandomBoard } from "./utils/helpers";


export type MemoryItem = {
  idx: number;
  value: number;
  imageUrl?: string;
  isOpen: boolean;
  isFound: boolean;
}

export default function App() {

  const NUMBER_OF_CARDS = 2;
  const [values, setValues] = useState<MemoryItem[]>([]);


  useEffect(() => {
    createRandomBoard(NUMBER_OF_CARDS).then(res => setValues(res))
  }, []);


  useEffect(() => {
    checkCards();
    if (values.length && won()) {
      alert("YOU HAVE WON, CONGRATULATIONS")
    }
  }, [values]);

  function won() {
    for (let value of values) {
      if (!value.isFound) {
        return false;
      }
    }
    return true;
  }

  function checkCards() {
    let openedCardsList = openedCards();
    if (openedCardsList.length === 2 && openedCardsList[0].value === openedCardsList[1].value) {
      markAsFound(openedCardsList[0].idx, openedCardsList[1].idx);
    } else if (openedCardsList.length === 2) {
      setTimeout(() => {
        resetOpenedCards(openedCardsList[0].idx, openedCardsList[1].idx);
      }, 1000)
    }
  }

  function markAsFound(idx1: number, idx2: number) {
    setValues((prev: MemoryItem[]) => {
      prev[idx1].isFound = true;
      prev[idx2].isFound = true;
      return [...prev];
    });
  }

  function resetOpenedCards(idx1: number, idx2: number) {
    setValues((prev: MemoryItem[]) => {
      prev[idx1].isOpen = false;
      prev[idx2].isOpen = false;
      return [...prev];
    });
  }

  function openedCards(): MemoryItem[] {
    const cards = [...values];
    return cards.filter(value => {
      return value.isOpen && !value.isFound
    });
  }

  function handleClick(idx: number) {
    if (openedCards().length > 2) {
      return;
    }
    setValues((prev: MemoryItem[]) => {
      prev[idx].isOpen = true;
      return [...prev]
    });
  }


  return (
    <div className="App">
      <h1>Memory</h1>
      <MemoryBoard values={values} handleClick={handleClick} />
    </div>
  )
}

