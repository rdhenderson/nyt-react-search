import React from "react";

class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);

  }

  handleDelete(id) {
    return function(event) {
        this.props.onDelete(id);
    }.bind(this)
  }

  render() {
    console.log("this.props.saved", this.props.saved)
    return (
      <div>
        { this.props.saved.map( (item, index) =>
          (
            <div key={`article-${index}`} className="well">
              <h3 className='articleHeadline'>
                <span className='label label-primary'> {index+1}</span>
                <a href={item.url}>{item.title}</a>
              </h3>
              <h5> {item.author} </h5>
              <button type="button" onClick={this.handleDelete(item._id)} className="btn btn-default">
                <i className="fa fa-trash"></i>
              </button>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Saved;
