import React from 'react'

const Rep = (props) => {
    return (
        <div className='rep-info'>
            <h1>Info</h1>
            <span>{props.rep.first_name ? props.rep.first_name : 'First Name'}</span>
            <span>{props.rep.last_name ? props.rep.last_name : 'Last Name'}</span>
            <span>{props.rep.district ? props.rep.district : 'District'}</span>
            <span>{props.rep.phone ? props.rep.phone : 'Phone'}</span>
            <span>{props.rep.office ? props.rep.office : 'Office'}</span>
        </div>
    )
}

export default Rep;