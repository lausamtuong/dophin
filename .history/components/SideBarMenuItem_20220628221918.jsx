import React from 'react';

const SidebarMenuItem = ({text,Icon}) => {
    return (
        <div>
           <Icon className='h-7'/>
           <span>{text}</span>
        </div>
    );
}

export default SidebarMenuItem;
