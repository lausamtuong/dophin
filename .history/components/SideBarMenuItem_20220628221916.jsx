import React from 'react';

const SidebarMenuItem = ({Text,Icon}) => {
    return (
        <div>
           <Icon className='h-7'/>
           <span>{text}</span>
        </div>
    );
}

export default SidebarMenuItem;
