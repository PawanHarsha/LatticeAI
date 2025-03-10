import React, { useState } from 'react';
import { Header, Header2 } from './header.jsx';
import './homepage.css';
import { TypingAnimation } from './extras.jsx';

const textLines = [
    { text: "Lattice AI", className: "text15" },
    { text: "Weave Your AI Blueprint. Compose Your Digital Reality.", className: "text4" }
  ];


const Homepage = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [iconsl, setIconsl] = useState(3);  // Add state for number of icons

    const handleMouseEnter = () => {
        setIsHovered(true);
        setIconsl(5);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIconsl(3);
        
    };

    const iconarray={
        "RAG":{
           href: '/VSF-GPT',
           id:'r'
        },
        "Coder":{
           href: '/',
           id:'c'
        },
        "Agent":{
           href: '/workstation',
           id: 'a'
        },
        "Anlaytics":{
           href: '/',
           id: 'l'
        },
        "Workflows":{
           href: '/',
           id: 'w'
        }

    }

    const icons = () => {
        const iconKeys = Object.keys(iconarray);
        const visibleIcons = iconKeys.slice(0, iconsl);
        
        return visibleIcons.map((iconName) => (
            <div 
                key={iconarray[iconName].id}
                id={iconarray[iconName].id} 
                className="central-content" 
                onClick={() => window.location.href = iconarray[iconName].href}
            >
                <h3>{iconName}</h3>
            </div>
        ));
    };

    const handleDoubleClick = () => {
        handleMouseLeave();
        document.getElementById('sol').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="homepage">
            <header>
                <Header className='homeheader'/>
                <Header2 className='logoheader'/>
            </header>
            <div className="central">
                <div className='centcontent'>
                    <div id='icons'>
                        <div id='ccontent' className={isHovered ? 'expanded' : ''}>
                          {icons()}
                        </div>
                        <div id='chead'>
                            <div id='m' className="central-content" 
                                onClick={handleMouseEnter}
                                onDoubleClick={handleDoubleClick}>
                                <h3>More >></h3>
                            </div>
                        </div>
                    </div>
                    <div id="box" className={isHovered ? 'slide-right' : ''}>
                        <TypingAnimation textLines={textLines} />
                    </div>
                </div>
            </div>
            <div id='sol' className='solutions'>
                <h2>LatticeAI Solutions</h2>
                <ul></ul>
            </div>
            <div className='edu'>
                <h2>LatticeAI Edu</h2>
                <ul></ul>
            </div>
        
        </div>

    );
}

export default Homepage;