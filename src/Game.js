import React from 'react';
import Board from './Board';
import PubNubReact from 'pubnub-react';

const calculateWinner = (squares) => {
  console.log(squares);
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winnerRow: lines[i] };
    }
  }

  return { winner: null, winnerRow: null };
};

const getLocation = (move) => {
  const locationMap = {
    0: {row: 0, col: 0},
    1: {row: 0, col: 1},
    2: {row: 0, col: 2},
    3: {row: 1, col: 0},
    4: {row: 1, col: 1},
    5: {row: 1, col: 2},
    6: {row: 2, col: 0},
    7: {row: 2, col: 1},
    8: {row: 2, col: 2},
  };

  console.log(locationMap[move]);
  return locationMap[move];
};


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: "pub-c-fc3066d1-e616-4a54-902b-1802388fdeaf",
      subscribeKey: "sub-c-ed355780-93bd-11e9-9769-e24cdeae5ee1"
    });
    this.state = {
      // history: [
      //   {
      //     squares: Array(9).fill(''),
      //   },
      // ],
      squares: Array(9).fill(''),
      currentStepNumber: 0,
      myTurn: false,
      username: 'Player 1',
      rival_username: 'Player 2',
      is_playing: false,
      is_waiting: false,
      is_room_creator: false,
      value: '',
      input: ''
    };

    // this.historyCopy = this.state.history;
    this.channel = null;

    this.room_id = null;
    this.pubnub.init(this);
    this.turn = 'X';
    this.piece = 'O';

    this.ids = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8]
		];

  }

  componentWillUnmount(){
    console.log('unmounting');
    this.pubnub.unsubscribe({
      channels : [this.channel]
    });
  }

  componentWillMount(){
    console.log('mounting');
    this.pubnub.subscribe({
      channels: ['gameLobby'],
      withPresence: true
    });
    this.pubnub.getMessage('gameLobby', (msg) => {
      console.log(msg);
      if(msg.message.is_room_creator){
        console.log('room creator');
      }
      if(msg.message.not_room_creator){
        console.log('starting game');
    
        this.pubnub.unsubscribe({
          channels : ['gameLobby']
        }); 
        console.log("unsub");
        this.setState({
          is_waiting: false,
          is_playing: true,
          rival_username: this.state.rival_username
          // rival_username: data.username
        });  
        console.log(this.state.is_playing);          
      } 
    });

    // if(this.channel != null){
    //   this.pubnub.getMessage(this.channel, (msg) => {
    //     console.log(msg);
    //   });      
    // }
  }

  componentDidUpdate(){
    this.pubnub.getMessage(this.channel, (msg) => {
      // console.log(msg);
      if(msg.message.restart){
        this.setState({
          squares: Array(9).fill('')
        });


        this.myTurn = false;
      }

			if(msg.message.piece === 'X'){
        console.log(msg);
        this.convertToCoords(msg.message.row_index, msg.message.index);

				// let moves = this.state.moves;
				// let id = this.ids[msg.message.row_index][msg.message.index];
				// console.log(id);
				// moves[id] = msg.message.piece;
				// console.log(moves[id]);
				
				// this.setState({
				// 	moves
				// });

				// this.updateScores.call(this, moves);
        // this.turn = 'X';
      }
    });
  }

  convertToCoords = (row, col) => {
    let getSquare = this.ids[row][col];
    console.log(getSquare);
    this.putOnBoard(getSquare);
  }

  joinRoom = () => {
    this.channel = 'tictactoe--' + this.state.input;
    console.log(this.channel);
    this.pubnub.subscribe({
      channels: [this.channel],
      withPresence: true
    });
    
    this.pubnub.publish({
      message: {
        readyToPlay: true,
        not_room_creator: true,
      },
      channel: 'gameLobby'
    });
    console.log('published');

    this.setState({
      is_waiting: true,
      // is_playing: true
    }); 
  }

  handleChange = (event) => {
    this.setState({input: event.target.value});
  }

  handleSubmit = (event) => {
    console.log(this.state.input);
    this.joinRoom();
  }

  putOnBoard(i) {
    // console.log(this.turn);
    // console.log(this.piece);

    // const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
    // const current = history[history.length - 1];
    // const squares = current.squares.slice();

    const squares = this.state.squares;
    console.log(squares);

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.myTurn ? 'O' : 'X';
    this.setState({
      // history: history.concat([
      //   {
      //     squares,
      //   },
      // ]),
      squares: squares,
      myTurn: !this.state.myTurn,
      // currentStepNumber: history.length,
    });

    // console.log(getLocation(i));
    let temp = getLocation(i);
    let row = temp.row;
    let col = temp.col;
    console.log(row);
    console.log(col);
   
  }

  handleClick(i) {
    if(!this.state.is_playing){
      console.log('cant click');
      return;
    }

    console.log(this.state.myTurn);
    if(this.state.myTurn){
      // const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
      // const current = history[history.length - 1];
      // const squares = current.squares.slice();

      const squares = this.state.squares;

  
      if (calculateWinner(squares).winner || squares[i]) {
        return;
      }
      squares[i] = 'O';
      this.setState({
        squares: squares,
        myTurn: !this.state.myTurn,
      });
  
      console.log(squares);
      // console.log(getLocation(i));
      let temp = getLocation(i);
      console.log(temp);
      let row = temp.row;
      let col = temp.col;
      console.log(row);
      console.log(col);
  
      this.turn = (this.turn === 'O') ? 'X' : 'O';
      console.log('room creator: ' + this.room_creator);
      this.pubnub.publish({
        message: {
          row_index: row,
          index: col,
          piece: this.piece,
          room_creator: false,
          turn: this.turn
        },
        channel: this.channel
      });       
    }
  }

  render() {
    console.log(this.state.is_playing);
    // this.room_id = window.prompt("Enter room id");
    // if(this.room_id != null){
    //   this.joinRoom();
    // }
    // console.log(this.room_id);
    // const { history } = this.state;
    // console.log(history);
    // let historyCopy = this.state.history;
    // console.log(historyCopy);
    // const current = history[this.state.currentStepNumber];
    // console.log(current);
    const { winner, winnerRow } = calculateWinner(this.state.squares);

    let status;
    if (winner) {
      status = `Winner ${winner}`;
    // } else if (squares.length === 10) {
    //   status = 'Draw. No one won.';
    } 
    else {
      status = `Next player: ${this.state.myTurn ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        {/* <div>
          <h3>RN Tic-Tac-Toe</h3>
        </div>  */}

        {/* {
          !this.state.is_playing &&
          <Lobby
            joinRoom={this.joinRoom}
          />            
        } */}


  
          <Board
            squares={this.state.squares}
            winnerSquares={winnerRow}
            onClick={i => this.handleClick(i)}
          />            

          <div className="game-info">{status}</div>    

          <div className="input-field">
              <input type="text" onChange={ this.handleChange } />
              <input
                type="button"
                value="Submit"
                onClick={this.handleSubmit}
              />
        </div>     

        {/* <div className="input-field">
          <form onSubmit={this.joinRoom}>
              <label>
                Name of lobby:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
          </form>
        </div>   */}

      </div>
    );
  }
}

export default Game;