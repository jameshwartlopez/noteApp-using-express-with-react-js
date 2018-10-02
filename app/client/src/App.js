import React, { Component } from 'react';
import './App.css';

import Note from './notes/note.js';
import DeleteNote from './notes/delete_note.js';
import ViewNote from './notes/view_note.js';
import EditNote from './notes/edit_note.js';
import CreateNewNote from './notes/create_new_note.js';

class App extends Component {

  changeAppMode = (newMode, notesId) => {
    this.setState({currentMode: newMode});

    if(notesId !== undefined){
      this.setState({notesId: notesId});
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      currentMode: 'readAll',
      notesId: null
    };
  }

  render() {

    var  modeComponent = <Note changeAppMode={this.changeAppMode} />;

    switch(this.state.currentMode){
      case 'readAll':
        //No need to create a read component object because its the default component
        break;
      
      case 'createNewNote':
        modeComponent = <CreateNewNote notesId={this.state.notesId} changeAppMode={this.changeAppMode}/>;
        break;

      case 'viewNote':
        modeComponent = <ViewNote notesId={this.state.notesId} changeAppMode={this.changeAppMode}/>;
        break;

      case 'updateNote':
        modeComponent = <EditNote notesId={this.state.notesId} changeAppMode={this.changeAppMode}/>;
        break;


      case 'deleteNote':
        modeComponent = <DeleteNote notesId={this.state.notesId} changeAppMode={this.changeAppMode}/>;
        break;

      default:
            break;
    }

    return modeComponent;
  }
}

export default App;
