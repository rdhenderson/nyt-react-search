import React from "react";

// Our Container component's only purpose will be to hold and center the rest of our content
// props.children will be substituted for any nested components deployed
const Container = props => (
  <div className="row">
    <div className="col-sm-12">
      <br />
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i> {props.title} </strong></h3>
        </div>
        <div className="panel-body">
          {props.children}
        </div>
      </div>
    </div>
  </div>
);


// Exporting this component as the default (only) export
export default Container;
