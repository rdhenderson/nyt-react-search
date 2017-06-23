import React from "react";
import axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    //Set default state
    this.state = {
      numArticles: '5',
      searchTerm: "",
      startYear: '',
      endYear: '',
    };
    //Bind clickhandlers to this object
    this.handleChange = this.handleChange.bind(this);
    // this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(key){
    return function(event) {
      event.preventDefault()
      let state = {};
      state[key] = event.target.value;
      this.setState(state);
    }.bind(this);
  }

  // handleSearchChange(event){
  //   this.setState({searchTerm: event.target.value});
  // }

  handleSubmit(event){
    event.preventDefault();

    console.log("Handling search", this.state.searchTerm);
    const apiKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    const queryURLBase = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=`

    let queryURL = queryURLBase + this.state.searchTerm;

    // If the user provides a startYear -- the startYear will be included in the queryURL
    if (parseInt(this.state.startYear)) {
      queryURL = queryURL + "&begin_date=" + this.state.startYear + "0101";
    }
    // If the user provides a startYear -- the endYear will be included in the queryURL
    if (parseInt(this.state.endYear)) {
      queryURL = queryURL + "&end_date=" + this.state.endYear + "0101";
    }

    console.log("queryURL", queryURL);
    axios.get(queryURL).then( ({data}) => {
        //Slice results to only return number of articles requested
        console.log("DATA", data);
        const resultsArray = data.response.docs.slice(0,parseInt(this.state.numArticles))
          .map( item => ({
            title: item.headline.main,
            author: (item.byline) ? item.byline.original : 'unattributed',
            snippet: item.snippet,
            url: item.web_url,
            date: item.pub_date,
          }));
          //Send results up to app for propogation
        this.props.onSearchResult(resultsArray);
    });
  }

  handleClear(){

  }

  render() {
    return (
        <form role="form">
          <div className="form-group">
            <label htmlFor="search">Search Term:</label>
            <input type="text" onChange={this.handleChange('searchTerm')} className="form-control" value={this.state.searchTerm} />
          </div>

          <div className="form-group">
            <label htmlFor="pwd">Number of Records to Retrieve:</label>
            <select onChange={this.handleChange('numArticles')} value={this.state.numArticles} className="form-control" id="num-records-select">
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="start-year">Start Year (Optional):</label>
            <input type="text" onChange={this.handleChange('startYear')} className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="end-year">End Year (Optional):</label>
            <input type="text" onChange={this.handleChange('endYear')} className="form-control" />
          </div>

          <button type="submit" onClick={this.handleSubmit} className="btn btn-default" id="run-search">
            <i className="fa fa-search"></i>
            Search
          </button>

          <button type="button" onClick={this.handleClear} className="btn btn-default" id="clear-all">
            <i className="fa fa-trash"></i>
            Clear Results
          </button>
        </form>
    );
  }
}

export default Search;
