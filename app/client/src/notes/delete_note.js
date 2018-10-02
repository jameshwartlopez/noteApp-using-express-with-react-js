import React from 'react'
import $ from 'jquery'

import AppHeader from '../AppHeader.js';


class DeleteNote extends React.Component {
	

	// handle single row deletion
	onDelete = (e) => {

		var notesId = this.props.notesId
		
		var ajaxSettings = {
			"url": "/notes/" + notesId,
			"method": "DELETE",
			"headers": {
			    "content-type": "application/x-www-form-urlencoded",
			    "cache-control": "no-cache"
			},
			success : function(response) {
	            this.props.changeAppMode('read');
	        }.bind(this),
	        error: function(xhr, resp, text){
	            // show error in console
	            console.log(xhr, resp, text);
	        }
	 	}
	 
	    // submit form data to api
	    $.ajax(ajaxSettings);
	}

	
	render() {
		return (
			<div className="App">
		        <AppHeader/>

		        <div>

		          	<div className='row'>
			            <div className='col-md-3'></div>
			            <div className='col-md-6'>
			            	<br/><br/>
			            	<div className="card">
							  <div className="card-body">
							    Are you sure, you want to delete this note? 
							  </div>

							  <div className="card-footer">
							  	<div className='text-align-center'>
			                            <button onClick={this.onDelete}
			                                className='btn btn-danger m-r-1em'>Yes</button>
			                            <button onClick={() => this.props.changeAppMode('readAll')}
			                                className='btn btn-primary'>No</button>
			                       </div>
							  </div>
							</div>
			            </div>
			            
			        </div>
		        </div>
		      </div>
	        
	    );
	}
}

export default DeleteNote;