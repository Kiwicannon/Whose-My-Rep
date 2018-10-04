import React, { Component } from 'react';
import './Representatives.css'
import stateList from './stateList.json';
import Axios from 'axios';
export default class Representatives extends Component {
    constructor() {
        super();
        this.state = {
            Representatives: [],
            State: '',
            Type: ''
        }
        this.handleClickSubmit = this.handleClickSubmit.bind(this)
    }
    // handleTypeChange(e) {
    //     this.setState({
    //         Type: e.target.value
    //     })
    // }

    // handleStateChange(e) {
    //     this.setState({
    //         State: e.target.value
    //     })
    // }
    
    handleClickSubmit() {
        console.log(this.state)
        if (this.state.Type && this.state.State) {
            Axios.get(`http://localhost:3000/${this.state.Type}/${this.state.State}`)
            .then(( res ) => {
                console.log(res)
            })
        }
    }

    render() {
        const state = stateList.map(( e, i ) => {
            return <option key={i} value={e.abbreviation}>{ e.name }</option>
        })
        return (
            <div>
                <select onChange={ (e) => this.setState({ Type: e.target.value }) }>
                    <option value=''>Select Type</option>
                    <option value='Representative'>Representative</option>
                    <option value='Senator'>Senator</option>
                </select>
                <select onChange={ (e) => this.setState({ State: e.target.value }) }>
                    <option value=''>Select State</option>
                    { state }
                </select>
                <button disabled={!this.state.State && !this.state.Type} onClick={ this.handleClickSubmit }>Submit</button>
            </div>
        )
    }
}
