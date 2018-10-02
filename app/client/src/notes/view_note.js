import React from 'react'
import $ from 'jquery'

import AppHeader from '../AppHeader.js';

class ViewNote extends React.Component {

	constructor(props) {
		// Get this notes fields from the data attributes we set on the
	    super(props);
	    this.state = {
	        id: 0,
	        title: '',
	        content: '',
	        createdAt: '',
	        updatedAt: ''
	    };
	}

	// on mount, read product data and them as this component's state
	componentDidMount() {

		var notesId = this.props.notesId;
	 
	    this.serverRequestProd = $.get("/notes/" + notesId,
	        function (note) {
	            this.setState({id: note._id});
	            this.setState({title: note.title});
	            this.setState({content: note.content});
	            this.setState({createdAt: note.createdAt});
	            this.setState({updatedAt: note.updatedAt});
	            
	        }.bind(this));
	 
	    
	}


	// on unmount, kill categories fetching in case the request is still pending
	componentWillUnmount() {
		this.serverRequestProd.abort();
	}

	render() {
		return (
			<div className="App">
				<AppHeader/>

				<div className="row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						<br/><br/>
						<div className="card">
						  <div className="card-body">
						    <h5 className="card-title">{this.state.title}</h5>
						    <p className="card-text">{this.state.content}</p>
						  </div>
						  <div className="card-body">
						    <a href="#readAll" className="card-link" onClick={() => this.props.changeAppMode('readAll')}>View All Notes</a>
						    <a href="#updateNote" onClick={() => this.props.changeAppMode('updateNote', this.props.notesId)} className="card-link">Edit</a>
						  </div>
						</div>
					</div>
				</div>
				
			</div>
	        
	    );
	}

}

export default ViewNote;