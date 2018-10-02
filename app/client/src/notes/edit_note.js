import React from 'react'
import $ from 'jquery'

import AppHeader from '../AppHeader.js';

class EditNote extends React.Component {

	constructor(props) {
		// Get this notes fields from the data attributes we set on the
	    super(props);
	    this.state = {
	        id: 0,
	        title: '',
	        content: '',
	        createdAt: '',
	        updatedAt: '',
	        successUpdate: null
	    };
	}

	onTitleChange = (e) => {
		this.setState({title: e.target.value});
	}

	onContentChange = (e) => {
		this.setState({content: e.target.value});
	}

	// on mount, read product data and them as this component's state
	componentDidMount() {

		var notesId = this.props.notesId;
	 
	    this.serverRequestNote = $.get("/notes/" + notesId,
	        function (note) {
	            this.setState({id: note._id});
	            this.setState({title: note.title});
	            this.setState({content: note.content});
	            this.setState({createdAt: note.createdAt});
	            this.setState({updatedAt: note.updatedAt});
	            
	        }.bind(this));
	}

	// on unmount
	componentWillUnmount() {
		this.serverRequestNote.abort();
	}

	// handle save changes button clicked
	onSave = (e) => {
	    var settings = {
		  "url": "/notes/" + this.state.id,
		  "method": "PUT",
		  "headers": {
		    "content-type": "application/x-www-form-urlencoded",
		    "cache-control": "no-cache"
		  },
		  "data": {
		    "title": this.state.title,
		    "content": this.state.content
		  },
		  success : function(response) {
		  	if(response._id){
	            this.setState({successUpdate: 'Successfully updated!'});
		  	}
	      }.bind(this),
	      
	      error: function(xhr, resp, text){
	            // show error to console
	            console.log(xhr, resp, text);
	      }
		}

		// submit form data to api
		$.ajax(settings);
	 
	    
	    
	    e.preventDefault();
	}

	render() {
		var floatLeft = {
			float: 'left',
			fontWeight: 'bold'
		};
		return (
			<div className="App">
				<AppHeader/>

				<div className="row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						<br/><br/>
						{
			                this.state.successUpdate === "Successfully updated!" ?
			                    <div className='alert alert-success'>
			                        Successfully updated!
			                    </div>
			                : null
			            }

						<form onSubmit={this.onSave}>
						<div className="card">
						  <div className="card-body">
						  	<div className="form-group">
							    <label htmlFor="noteTitle" style={floatLeft} >Note Title</label>
							    <input id="noteTitle" onChange={this.onTitleChange} value={this.state.title} type="text" className="form-control"  placeholder="Enter note title" />
							 </div>

							 <div className="form-group">
							    <label htmlFor="noteContent" style={floatLeft}>Content</label>
							    <textarea id="noteContent" onChange={this.onContentChange} value={this.state.content} className="form-control" rows="3"></textarea>
							 </div>
						  </div>
						  <div className="card-body">
						    <a href="#readAll" className="card-link " onClick={() => this.props.changeAppMode('readAll')}>View All Notes</a>
						    <a href="#saveChanges" className="card-link btn btn-primary" onClick={this.onSave}>Save Changes</a>
						  </div>
						</div>
						</form>
						<br/><br/>
					</div>
				</div>
				
			</div>
	        
	    );
	}

}

export default EditNote;