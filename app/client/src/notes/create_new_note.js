import React from 'react'
import $ from 'jquery'

import AppHeader from '../AppHeader.js';

class CreateNewNote extends React.Component {

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

	}

	// on unmount
	componentWillUnmount() {
	
	}

	// handle save changes button clicked
	onSave = (e) => {
	    var settings = {
		  "url": "/notes/",
		  "method": "POST",
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
	            this.setState({successUpdate: 'Successfully created!'});
		  	}
	      }.bind(this),
	      
	      error: function(xhr, resp, text){
	            // show error to console
	            console.log(xhr, resp, text);
	      }
		}


		if(this.state.title == ""){
			alert("Empty title");
		} else if(this.state.content == ""){
			alert("Empty content for note");
		} else {
			// submit form data to api
			$.ajax(settings);	
		}
		
	 
	    
	    
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
			                this.state.successUpdate === "Successfully created!" ?
			                    <div className='alert alert-success'>
			                        Successfully created!
			                    </div>
			                : null
			            }

						<form onSubmit={this.onSave}>
						<div className="card">
						  <div className="card-body">
						  	<div className="form-group">
							    <label htmlFor="noteTitle" style={floatLeft} >Note Title</label>
							    <input 
							    	id="noteTitle" 
							    	onChange={this.onTitleChange} 
							    	value={this.state.title} 
							    	type="text" required className="form-control"  placeholder="Enter note title" />
							 </div>

							 <div className="form-group">
							    <label htmlFor="noteContent" style={floatLeft}>Content</label>
							    <textarea id="noteContent" required onChange={this.onContentChange} value={this.state.content} className="form-control" rows="3"></textarea>
							 </div>
						  </div>
						  <div className="card-body">
						    <a href="#readAll" className="card-link " onClick={() => this.props.changeAppMode('readAll')}>View All Notes</a>
						    <a href="#createNewNote" className="card-link btn btn-primary" onClick={this.onSave}>Create New Note</a>
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

export default CreateNewNote;