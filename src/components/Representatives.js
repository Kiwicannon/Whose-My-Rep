import React, { Component } from 'react';
import './Representatives.css'
import Info from './Info';

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
    
    handleClickSubmit() {
        console.log(this.state, `http://localhost:3000/${this.state.Type}/${this.state.State}`)
        if (this.state.Type && this.state.State) {
            if (this.state.Type === 'Representatives') {
                Axios.get(`http://localhost:3000/representatives/${this.state.State}`)
                .then(( res ) => {
                    console.log('res', res)
                    this.setState({
                        Representatives: res.data.results
                    })
                })
                
            }
            Axios.get(`http://localhost:3000/senators/${this.state.State}`)
            .then(( res ) => {
                this.setState({
                    Representatives: res.data.results
                })
            })
        }
    }

    render() {
        const { State, Type, Representatives } = this.state;
        const isEnabled =
         State.length > 0 && 
            Type.length > 0;
        const Rep = Representatives.map(( e, i) => {
            return (
            <div className='rep-list' key={i}>
                <h3>{ e.name }</h3>
                <h3>{ e.party }</h3>
            </div>
            )
        })
        const state = stateList.map(( e, i ) => {
            return <option key={i} value={e.abbreviation}>{ e.name }</option>
        })
        return (
            <div>
                <select onChange={ (e) => this.setState({ Type: e.target.value }) }>
                    <option value=''>Select Type</option>
                    <option value='Representatives'>Representative</option>
                    <option value='Senators'>Senator</option>
                </select>
                <select onChange={ (e) => this.setState({ State: e.target.value }) }>
                    <option value=''>Select State</option>
                    { state }
                </select>
                <button disabled={!isEnabled} onClick={ this.handleClickSubmit }>Submit</button>


                <h2>List / <span className='list-header'>{ this.state.Type }</span> </h2> 
                <div className='rep-header'>
                    <h3>Name</h3>
                    <h3>Party</h3>
                </div>
                { Rep }
                { Info }
            </div>
        )
    }
}
