import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

import {Chess} from 'chess.js';
import * as ChessBoard from 'chessboardjs';
import * as randomstring from 'randomstring';

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.state = {id: null};
  }
  
  setupChess(canMove) {
    // set up chess platform
    this.chess = new Chess(this.props.oppFen);
    
    const id = randomstring.generate();
    
    this.board = ChessBoard(id, {
      draggable: canMove,
      position: this.props.oppFen,
      onDrop: this.onDrop,
      orientation: this.props.color
    });
    
    this.setState({id});
  }
  
  componentDidMount() {
    // set up sockets
    console.log(this.props.oppId);
    // data: fen (for opponent's fen)
    this.props.socket.on('receive fen', data => {
      this.props.receiveMove(data.fen);
    });
    
    const canMove = this.props.color === 'white';
    this.setupChess(canMove);
  }
  
  // upon redux update, which occurs upon websocket signal
  componentDidUpdate() {
    this.setupChess(true);
  }
  
  onDrop(source, target, piece, newPos, oldPos, orientation) {
    // if target is on board, make move
    
    // was the move valid?
    
    // set self to have already moved
    
    // broadcase move to opponent
  }
  
  render() {
    return <div id={this.state.id} style="width: 400px"></div>;
  }
}


function mapStateToProps(state) {
  return {color: state.game.color, socket: state.game.socket,
    oppId: state.game.oppId, oppFen: state.board.oppFen
  };
}

export default connect(mapStateToProps, actions)(Game);

