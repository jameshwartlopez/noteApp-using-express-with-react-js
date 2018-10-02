import React from 'react';

class NoteList extends React.Component {
	
	render() {
		
		var currentProps = this.props;
		var noteList = currentProps.notesList;

		//get all notes
		var noteHtmlList = noteList.map(function(note, index){
			return (
				            <li key={note._id} className="list-group-item d-flex justify-content-between align-items-center">
				              {note.title}
				              <div className="btn-group" role="group" aria-label="Basic example">
				                
				                <button 
				                	onClick={() => currentProps.changeAppMode('viewNote', note._id)}
				                	type="button" className="btn btn-secondary">
				                	View
				                </button>
				                
				                <button 
				                	onClick={() => currentProps.changeAppMode('updateNote', note._id)}
				                	type="button" className="btn btn-secondary">
				                	Edit
				                </button>
				                
				                <button 
				                	onClick={() => currentProps.changeAppMode('deleteNote', note._id)}
				                	type="button" className="btn btn-secondary">
				                	Delete
			                	</button>
				              </div>
				            </li>
			         );
		});
		
		return (!noteList.length ? <div className='alert alert-danger'>No notes found.</div>: <ul className="list-group">{noteHtmlList}</ul>);
		
	}
}

export default NoteList;