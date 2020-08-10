import React, { Component } from 'react';


class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: '',
            searchGeneration: '',
            searchAttribute: '',
            searchResults: '',
            data: []
        }
    }

    componentDidMount = () => {
        this.loadData();
    }

    loadData = () => {
        let data = require("./digimon-json.js");
        // console.log(data);
        this.setState({data: data});
    }
    

    // handle changes to fields
    handleChanges = (event) => {
        if (event.target.name === 'name') {
            this.setState({
                searchName: event.target.value
            });
        }
        else if (event.target.name === 'generation') {
            this.setState({ searchGeneration: event.target.value });
        }
        else if (event.target.name === 'attribute') {
            this.setState({ searchAttribute: event.target.value });
        }
    }

    // load data by search results
    loadSearchData = async (event) => {
        event.preventDefault();
        if (event.target.name === 'nameSearch') {
            // const response = await fetch(`/api/searchByName/${this.state.searchName}`);
            // const json = await response.json();
            // console.table(json);
            // let jsonArray = [json];
            // this.setState({ searchResults: json });
            // console.log(json)
            let results;
            this.state.data.forEach((digimon) => {
                if (digimon.name === this.state.searchName){
                    results = digimon;
                }
            });
            console.log(results)
            this.setState({searchResults: results});
        }
        else if (event.target.name === 'generationSearch') {
            // const response = await fetch(`/api/searchByGeneration/${this.state.searchGeneration}`);
            // const json = await response.json();
            // console.table(json);
            // this.setState({ searchResults: json });
            let results = [];
            this.state.data.forEach((digimon) => {
                if (digimon.generation === this.state.searchGeneration){
                    results.push(digimon);
                }
            })
            console.log(results);
            this.setState({searchResults: results});
        }
        else if (event.target.name === 'attributeSearch') {
            // const response = await fetch(`/api/searchByAttribute/${this.state.searchAttribute}`);
            // const json = await response.json();
            // console.table(json);
            // this.setState({ searchResults: json });
            let results = [];
            this.state.data.forEach((digimon) => {
                if(digimon.attribute === this.state.searchAttribute){
                    results.push(digimon);
                }
            });
            console.log(results);
            this.setState({searchResults: results});

        }
        console.log(this.state.searchResults.length);
    }

    // display page
    render() {
        // change how results are displayed base on length of searchResults
        let displayResults;
        if (this.state.searchResults.length === undefined) {
            let digimon = this.state.searchResults;
               displayResults = <div>
                    <fieldset>
                        <legend>{digimon.name}</legend>
                        <p>Generation: {digimon.generation}</p>
                        <p>Attribute: {digimon.attribute}</p>
                        <p>Prior Form: {digimon.priorForm}</p>
                        <p>Next Form: {digimon.nextForm}</p>
                        <p>{digimon.description}</p>
                        <img src={digimon.img} alt={digimon.name} />
                    </fieldset>
                </div>
            
        }
        else if (this.state.searchResults.length > 0) {
         displayResults = <div className='search-container'>
                    {this.state.searchResults.map(
                        (digimon) => {
                            return (
                                <div key={digimon._id}>
                                    <fieldset>
                                        <legend>{digimon.name}</legend>
                                        <p>Generation: {digimon.generation}</p>
                                        <p>Attribute: {digimon.attribute}</p>
                                        <p>Prior Form: {digimon.priorForm}</p>
                                        <p>Next Form: {digimon.nextForm}</p>
                                        <p>{digimon.description}</p>
                                        <img src={digimon.img} alt={digimon.name} />
                                    </fieldset>
                                </div>
                            )
                        }
                    )}
                </div>
            
        }
        return (
            <div className='container'>
                <h1 className="header">Digimon Search App</h1>

                <form action="" id='search-by-name'>
                    <label htmlFor="name">Search by name:</label>
                    <input type="text" name='name' value={this.state.searchName} onChange={this.handleChanges} />
                    <button name='nameSearch' onClick={this.loadSearchData}>Submit</button>
                </form>

                <form action="" id='search-by-generation'>
                    <label htmlFor="generation">Search by generation:</label>
                    <input type="text" name='generation' value={this.state.searchGeneration} onChange={this.handleChanges} />
                    <button name='generationSearch' onClick={this.loadSearchData}>Submit</button>
                </form>

                <form action="" id='search-by-attribute'>
                    <label htmlFor="attribute">Search by attribute:</label>
                    <input type="text" name='attribute' value={this.state.searchAttribute} onChange={this.handleChanges} />
                    <button name='attributeSearch' onClick={this.loadSearchData}>Submit</button>
                </form>

                <div id='results'>
                {displayResults}
                </div>
            </div>
        );
    }
}

export default AppContainer;