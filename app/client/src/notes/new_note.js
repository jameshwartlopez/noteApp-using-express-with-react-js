import React from 'react'



class NewNote extends React.Component {
	
	render() {
		return (
			 <div>
			 	<br/>
                <button className='btn btn-primary pull-left' onClick={() => this.props.changeAppMode('createNewNote')}>Create New Note</button>
                <br/><br/>
            </div>
		);
	}
}

export default NewNote;