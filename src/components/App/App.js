import React, { Component } from 'react';
import OptionsPanel from '../OptionsPanel'
import Board from '../Board';
import { createTiles, indexOfSelected } from '../../misc/utils';


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numTiles: 36,
      playing: false,
      previousTileIndex: null,
      tiles: [],
      toBeCleared: null,
    }

  }
  startGame = (numTiles) => {
    this.setState((state) => ({

      playing: true,
      previousTileIndex: null,
      toBeCleared: null,
      tiles: createTiles(state.numTiles, this.handleTileClicked)

    }))
  }

  handleTileClicked = (id, color) => {
    this.setState((state) => {
      const tiles = state.tiles;
      let toBeCleared = state.toBeCleared;
      const selectedTileIndex = indexOfSelected(tiles, id, color);
      let previousTileIndex = state.previousTileIndex;

      return {toBeCleared, selectedTileIndex, tiles, previousTileIndex}
    })
    if (toBeCleared !== null) {
      toBeCleared[0].selected = false;
      toBeCleared[1].selected = false;
      toBeCleared = null;
    }
    selectedTileIndex.selected = true;
    if (previousTileIndex !== null) {
      let previousTile = previousTileIndex;
      let selectedTile = selectedTileIndex;
      if (previousTile.id !== selectedTile.id && previousTile.color === color) {
        selectedTile.matched = true;
        previousTile.matched = true;
        previousTileIndex = null;

        return {selectedTile, previousTile, previousTileIndex}
      } else {
        toBeCleared = [previousTileIndex, selectedTileIndex]
        previousTileIndex = null;
      }
    } else {
      previousTileIndex = selectedTileIndex;
      return previousTileIndex
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Turbo-Matcher
        </header>
        <OptionsPanel startGame={this.startGame} playing={this.state.playing} numTiles={this.state.numTiles} />
        <Board numTiles={this.state.numTiles} tiles={this.state.tiles} />
      </div>
    );

  }
}

export default App;
