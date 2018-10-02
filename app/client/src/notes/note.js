import React from 'react'
import $ from "jquery";

import AppHeader from '../AppHeader.js';

import NewNote from '../notes/new_note.js';
import NoteList from '../notes/note_list.js';

class Note extends React.Component {
	

	constructor(props) {
		super(props)

		this.state = {
			notes: []
		}
	}

	componentDidMount(){
		this.serverRequest = $.get("/notes", function (notes) {
			this.setState({
				notes: notes
			});
		}.bind(this));
	}

	componentWillUnmount(){
		this.serverRequest.abort();
	}

	render() {
		
		//get all notes
		var notesList = this.state.notes;

		return (
			<div className="App">
		        <AppHeader/>

		        <div>

		          	<NewNote changeAppMode={this.props.changeAppMode}/>

		          	<NoteList notesList={notesList} changeAppMode={this.props.changeAppMode} />

		        </div>
		      </div>

			 
		);
	}
}

export default Note;