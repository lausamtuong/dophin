import React from 'react';

const SideBarMenuItem = ({Text,Icon}) => {
    return (
        <div>
           <Icon className='h-7'/>
           <span>{Text}</span>
        </div>
    );
}

export default SideBarMenuItem;
