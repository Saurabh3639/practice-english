"use client";

import React, { useState, useEffect } from "react";

// Utility function to create an empty 10x10 grid
const createEmptyGrid = () =>
  Array(10)
    .fill(null)
    .map(() => Array(10).fill(""));

// Puzzle Component
export default function WordPuzzle({ words, setFoundWords }) {
//   console.log("words in WordPuzzle:", words);

  const [grid, setGrid] = useState(createEmptyGrid());
  const [selectedCells, setSelectedCells] = useState([]);

  // Populate the grid with random letters and hidden words
  useEffect(() => {
    const newGrid = createEmptyGrid();

    // Function to place words in the grid
    const placeWordInGrid = (word) => {
      // Randomly decide position and orientation
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const direction = Math.floor(Math.random() * 3); // 0 = horizontal, 1 = vertical, 2 = diagonal

        if (canPlaceWord(newGrid, word, row, col, direction)) {
          for (let i = 0; i < word.length; i++) {
            newGrid[row + (direction === 1 ? i : direction === 2 ? i : 0)][
              col + (direction === 0 ? i : direction === 2 ? i : 0)
            ] = word[i];
          }
          placed = true;
        }
      }
    };

    // Place each noun in the grid
    words.forEach(placeWordInGrid);

    // Fill remaining empty cells with random letters
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (newGrid[row][col] === "") {
          newGrid[row][col] = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          ); // Random A-Z letter
        }
      }
    }
    setGrid(newGrid);
  }, [words]);

  // Helper function to check if a word can fit in a given position
  const canPlaceWord = (grid, word, row, col, direction) => {
    if (direction === 0 && col + word.length > 10) return false; // Horizontal
    if (direction === 1 && row + word.length > 10) return false; // Vertical
    if (direction === 2 && (col + word.length > 10 || row + word.length > 10))
      return false; // Diagonal

    for (let i = 0; i < word.length; i++) {
      const r = row + (direction === 1 ? i : direction === 2 ? i : 0);
      const c = col + (direction === 0 ? i : direction === 2 ? i : 0);
      if (grid[r][c] !== "" && grid[r][c] !== word[i]) return false;
    }
    return true;
  };

  // Handle cell click for word selection
  const handleCellClick = (row, col) => {
    setSelectedCells((prev) => [...prev, { row, col }]);
  };

  // Check if selected cells form a noun
  useEffect(() => {
    const selectedWord = selectedCells
      .map((cell) => grid[cell.row][cell.col])
      .join("");
    if (words.includes(selectedWord)) {
      setFoundWords((prev) => [...prev, selectedWord]);
      setSelectedCells([]); // Reset selection after finding a word
    }
  }, [selectedCells, grid, words, setFoundWords]);

  return (
    <>
      <div className="grid grid-cols-10 w-[360px] min-h-[360px] capitalize border-2 border-black rounded-lg p-2">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((letter, colIndex) => (
              <div
                key={colIndex}
                className={`text-center text-xl font-normal cursor-pointer py-1 px-2 cell ${
                  selectedCells.some(
                    (cell) => cell.row === rowIndex && cell.col === colIndex
                  )
                    ? "bg-primary text-white rounded-full"
                    : ""
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
