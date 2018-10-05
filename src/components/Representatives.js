import React, { Component } from 'react';
import axios from 'axios';
import './Representatives.css'
import Info from './Info';
import stateList from './stateList.json';



export default class Representatives extends Component {
    constructor() {
        super();
        this.state = {
            representatives: [],
            selectedRep: {
                name: ''
            },
            state: '',
            type: ''
        }
        this.handleClickSubmit = this.handleClickSubmit.bind(this)
        this.setSelectedRep = this.setSelectedRep.bind(this)
    }
    setSelectedRep(e) {
        e.first_name = e.name.split(' ')[0]
        e.last_name = e.name.split(' ')[1]
        this.setState({
            selectedRep: e
        })
    }

    handleClickSubmit() {
            this.setState({
                selectedRep: {}
            })
            if (this.state.type === 'Representatives') {
                axios.get(`http://localhost:3000/representatives/${this.state.state}`)
                .then(( res ) => {
                    this.setState({
                        representatives: res.data.results
                    })
                })
                
            }
            axios.get(`http://localhost:3000/senators/${this.state.state}`)
            .then(( res ) => {
                this.setState({
                    representatives: res.data.results
                })
            })
    }

    render() {
        const { state, type, representatives, selectedRep } = this.state;
        const Rep = representatives.map(( e, i) => {
            return (
            <span onClick={ () => this.setSelectedRep(e) } className='rep-list' key={i}>
                <h4>{ e.name }</h4>
                <h4>{ e.party }</h4>
            </span>
            )
        })
        const states = stateList.map(( e, i ) => {
            return <option key={i} value={e.abbreviation}>{ e.name }</option>
        })
        return (
            <div>
                <select onChange={ (e) => this.setState({ type: e.target.value }) }>
                    <option value=''>Select Type</option>
                    <option value='Representatives'>Representative</option>
                    <option value='Senators'>Senator</option>
                </select>
                <select onChange={ (e) => this.setState({ state: e.target.value }) }>
                    <option value=''>Select State</option>
                    { states }
                </select>
                <button disabled={state && type ? false : true } onClick={ this.handleClickSubmit }>Submit</button>

                <div className='rep-list-and-data'>
                    <div className='reps'>
                        <h2>List / <span className='list-header'>{ type }</span> </h2> 
                            <span className='rep-header'>
                                <h3>Name</h3>
                                <h3>Party</h3>
                            </span>
                            { Rep }
                    </div>
                    < Info rep={ selectedRep }/>
                </div>
            </div>
        )
    }
}
