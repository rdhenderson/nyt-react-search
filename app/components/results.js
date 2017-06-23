import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(id){
    return function(event) {
      console.log("Adding a saved article", this.props.results[id].title);
      this.props.onSave(this.props.results[id]);
    }.bind(this);
  }

  render() {
    return (
      <div>
        { this.props.results.map( (item, index) =>
          (
            <div key={`article-${index}`} className="well">
              <h3 className='articleHeadline'>
                <span className='label label-primary'> {index+1}</span>
                <a href={item.url}>{item.title}</a>
              </h3>
              <h5> {item.author} </h5>
              <button type="button" onClick={this.handleSave(index)} className="btn btn-default" id="clear-all">
                <i className="fa fa-save"></i>
              </button>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Results;
