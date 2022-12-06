import React, { Component } from 'react';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            searchData: [],
            nextToken: null,
            searchTerm: null,
            searchImageOnly: false,
            getMoreLoading: false,
            loading: false
        };
    }

    componentDidMount() {

    }

    render() {
        let getMoreLoadingBtn = this.state.searchData.length > 1 ?
            (
                this.state.getMoreLoading ?
                    <p>Getting more...</p> :
                    <button onClick={this.fetchMoreResults.bind(this)}>Get more</button>
            ) :
            null;

        let searchResultDiv = this.state.loading ?
            <p>Searching...</p> :
            (
                this.state.searchData.length > 0 ?
                    (
                        <div>
                            <h2>Search Results:</h2>
                            <ol>
                                {this.state.searchData.map((result, index) =>
                                    <li key={index}>{result}</li>
                                )}
                            </ol>
                            {getMoreLoadingBtn}
                        </div>
                    ) :
                    null
            );

        return (
            <div>
                <div>
                    <h1>Twitter Search</h1>
                    <label htmlFor="search_term">Search term: </label>
                    <input type="text" id="search_term" name="search_term"></input>
                    <br></br>
                    <label htmlFor="search_images_only">Images only </label>
                    <input type="checkbox" id="search_images_only" name="search_images_only"></input>
                    <br></br>
                    <button onClick={this.searchTwitter.bind(this)}>Search</button>
                </div>
                {searchResultDiv}
            </div>
        );
    }

    async fetchMoreResults() {
        this.setState({ getMoreLoading: true });

        let payload = JSON.stringify({
            SearchTerm: this.state.searchTerm,
            SearchImagesOnly: this.state.searchImagesOnly,
            NextToken: this.state.nextToken
        });

        fetch('https://localhost:7088/twitter/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: payload
        }).then(res => {
            return res.json();
        }).then(json => {
            let allResults = [...this.state.searchData, ...json.results];

            this.setState({
                searchData: allResults,
                nextToken: json.nextToken,
                getMoreLoading: false
            });
        });
    }

    async searchTwitter() {
        let searchTerm = document.getElementById('search_term').value.trim();
        let searchImagesOnly = document.getElementById('search_images_only').checked;

        if (searchTerm !== '') {
            this.setState({ loading: true });

            let payload = JSON.stringify({
                SearchTerm: searchTerm,
                SearchImagesOnly: searchImagesOnly
            });

            fetch('https://localhost:7088/twitter/search', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: payload
            }).then(res => {
                return res.json();
            }).then(json => {
                this.setState({
                    searchData: json.results,
                    nextToken: json.nextToken,
                    searchTerm: searchTerm,
                    searchImagesOnly: searchImagesOnly,
                    loading: false
                });
            });
        }
    }
}
