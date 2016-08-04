
/*
  Creating class Note
*/
var Note = React.createClass({

  getInitialState: function(){
    return {editing: false}
  },

  edit: function(){
    this.setState({editing : true});
  },

  save: function(){
    this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
    this.setState({editing : false});
  },

  remove: function(){
      this.props.onRemove(this.props.index);
  },

/**
  Normal display mode
*/
  renderDisplay: function(){
    return <div className='note'>
            <p>{this.props.children}</p>
            <span>
              <button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil"/>
              <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash"/>
            </span>
          </div>
  },

  /**
    Edit display mode
  */
  renderForm: function(){
    return <div className='note'>
            <textarea defaultValue={this.props.children} ref="newText" className='form-control'></textarea>
            <span>
              <button onClick={this.save} className="btn btn-success glyphicon glyphicon-floppy-disk"/>
            </span>
          </div>
  },

  render: function(){
    if(this.state.editing){
      return this.renderForm();
    }else{
      return this.renderDisplay();
    }
  }
});


/*
  Creating class Board
*/

var Board = React.createClass({
  propTypes: {
    count: function(props, propName){
      if(typeof props[propName] !== 'number'){
        alert("Count must be a number");
      }else if(props[propName] > 20){
        alert("Can't create more than 20 notes");
      }
    }
  },

  getInitialState: function(){
    return {
      notes: [
          'Task 1',
          'Task 2',
          'Task 3',
          'Task 4'
      ]
    };
  },

  /**
    updates the value of state note on a particular index
  */
  update: function(text, index){
    let notesArr = this.state.notes;
    notesArr[index] = text;
    this.setState({notes: notesArr});
  },

/**
  Removes a note from notes state
*/
  delete: function(index){
    let notesArr = this.state.notes;
    notesArr.splice(index, 1);
    this.setState({notes: notesArr});
  },

/**
  returns each note from notes state
*/
  eachNote: function(note, i){
    return (<Note key={i} index={i} onChange={this.update} onRemove={this.delete}>{note}</Note>);
  },

  render: function(){
    return (<div className="board">
        {this.state.notes.map(this.eachNote)}
    </div>);
  }
});

React.render(<Board></Board>, document.getElementById("react-container"))
