import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Search from "./components/search";
import Container from "./components/container";
import Results from "./components/results";
import Saved from "./components/saved";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      results : [],
      searchTerm : '',
      saved: [],
    };

    this.onSearchResult = this.onSearchResult.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);

  }

  componentWillMount() {
    axios.get('/api/saved')
      .then( ({data}) => this.setState({saved: data}));
  }

  onSearchResult(data) {
    this.setState({results: data});
  }

  onSave(article) {
    // const newSaved = this.state.saved.concat([article]);
    // this.setState({saved: newSaved});
    console.log("article", article);
    axios.post('/api/saved', article)
    .then( ({data}) => this.setState({saved: data}));
  }

  onDelete(id) {
    // const newSaved = this.state.saved.splice(id, 1);
    axios.delete(`/api/saved/${id}`)
    .then( (results) => this.setState({saved: results.data}));
    // this.setState({saved: newSaved});
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron nyt-search">
          <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
        </div>
        <Container title="Article Search">
          <Search
            results={this.state.results}
            onSearchResult={this.onSearchResult}
          />
        </Container>
        <Container title="Top Articles">
          <Results
            results={this.state.results}
            saved={this.state.saved}
            onSave={this.onSave}
          />

        </Container>
        <Container>
          <Saved
            saved={this.state.saved}
            onDelete={this.onDelete}
          />
        </Container>
        <div className="row">
          <div className="col-sm-12">

            <hr />
            <h5 className="text-center"><small>Borrowed from Ahmed with lots and lots of <i className="fa fa-heart"></i></small></h5>

          </div>
        </div>

      </div>

    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
