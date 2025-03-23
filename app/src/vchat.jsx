import React, { useState, useRef, useEffect } from 'react';
import './vchat.css';
import { Ollama } from 'ollama/browser';
import { PrivateRoute } from "./PrivateRoute";
import { Header, Header2 } from './header.jsx';
import { Loadpopup } from './signin.jsx';

import sendlogo from './assets/arrow-small-right-svgrepo-com.svg';
import botlogo from './assets/settings-v-svgrepo-com.svg';
import userlogo from './assets/user-2-svgrepo-com.svg';

const Chat = ({ userInput }) => {
  const [currentContext, setCurrentContext] = useState({
    name: 'New Chat',
    userMessages: [],
    botMessages: []
  });
  const [contexts, setContexts] = useState([currentContext]);
  const [input, setInput] = useState(userInput);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const messagesContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const createNewContext = () => {
    const newContext = {
      name: 'New Chat',
      userMessages: [],
      botMessages: []
    };
    setCurrentContext(newContext);
    setContexts([...contexts, newContext]);
  };

  const deleteContext = (contextName) => {
    const updatedContexts = contexts.filter(ctx => ctx.name !== contextName);
    
    if (updatedContexts.length === 0) {
      // Create a new empty context when deleting the last one
      const newContext = {
        name: 'New Chat',
        userMessages: [],
        botMessages: []
      };
      setContexts([newContext]);
      setCurrentContext(newContext);
      setHasSentMessage(false);
    } else {
      setContexts(updatedContexts);
      // If current context is deleted, switch to the first available context
      if (currentContext.name === contextName) {
        setCurrentContext(updatedContexts[0]);
      }
    }
  };

  const switchContext = (contextName) => {
    const selectedContext = contexts.find(ctx => ctx.name === contextName);
    if (selectedContext) {
      setCurrentContext(selectedContext);
    }
  };

  const Contextlist = () => {
    return (
      <ul>
        {contexts.map((context, index) => (
          <li key={index} className='context-item'>
            <button 
              className={`contextlists ${currentContext.name === context.name ? 'active' : ''}`}
              onClick={() => switchContext(context.name)}
            >
              {context.name}
            </button>
            {context.name !== 'New Chat' && (
              <button className='context-menu-button' onClick={() => deleteContext(context.name)}>
                delete
              </button>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( currentContext.name === 'New Chat') {
      const contextName = input.length > 20 ? input.substring(0, 20) + '...' : input;
      currentContext.name = contextName;
        }
    currentContext.userMessages.push(input);
    simulateChatbotResponse(input);
    setHasSentMessage(true);
    setInput('');
  };


  const ollama = new Ollama({ host: 'http://10.138.192.173:11434' })
  const simulateChatbotResponse = async (userMessage) => {
    try {
      const response = await ollama.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: userMessage }],
      })
      if (!response.ok) {
        console.log('NO RESPONSE')
        //throw new Error(`HTTP error! Status: ${response.status}`);
      }
    currentContext.botMessages.push(response.message.content);
    setCurrentContext({ ...currentContext });
    } catch (error) {
      console.error('Error sending request to API:', error);
    }
  };

  const allMessages = [];
  for (let i = 0; i < Math.max(currentContext.botMessages.length, currentContext.userMessages.length); i++) {
    if (currentContext.userMessages[i]) {
      allMessages.push(
        <div className='userchat'>
          <div key={`user-${i}`} className="message user">{currentContext.userMessages[i]}</div>
          <img src={userlogo} alt="user" className='clogo' />
        </div>
      );
    }
    if (currentContext.botMessages[i]) {
      allMessages.push(
        <div className='botchat'>
          <img src={botlogo} alt="bot" className='clogo' />
          <div key={`bot-${i}`} className="message bot">{currentContext.botMessages[i]}</div>
        </div>
      );
    }
  }

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages are updated
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [allMessages]);

  const [isExpanded, setIsExpanded] = useState(true);
  const slideContainer = () => {
    setIsExpanded(!isExpanded);
  };

  const restrictDialog = () => {
    alert("Restricted access");
  };

  return (
    <div>
      <div className='container'>
        <div className={`note-container ${isExpanded ? "slide-out" : ""}`}>
          <div className='context'>
            <button 
              className='contextbut' 
              onClick={() => createNewContext()} 
              disabled={!hasSentMessage || contexts.some(ctx => ctx.name === 'New Chat')}
            > 
              New Chat 
            </button>
            <ul style={{ color: "black" }}></ul>
            <Contextlist />
          </div>
          <div className='notes'>
            <h3 className='infolabel'>  </h3>
            <li className='infolables' onClick={() => restrictDialog()}> Development Agent </li>
            <li className='infolables' onClick={() => restrictDialog()}> Integration Agent </li>
          </div>
        </div>
        <div className='chat-container'>
          <div>
            <button className='slider' onClick={slideContainer}>
              {isExpanded ? ">>" : "<<"}
            </button>
            <Header2 />
          </div>
          <div ref={messagesContainerRef} className='chat-messages'>
            {allMessages}
          </div>
          <form className='chat-input-form' onSubmit={handleSubmit}>
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder='Type your question...'
              className='vinput'
              disabled={!sessionStorage.getItem('loggedin')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim()) {
                    handleSubmit(e);
                  }
                }
              }}
              rows={1}
              style={{ resize: 'none' }}
            />
            <button
              className='vbut'
              disabled={!input.trim() || !sessionStorage.getItem('loggedin')}
            >
              <img src={sendlogo} alt="send" className='senlogo' />
            </button>
          </form>
        </div>
        <div className='wiki-container'>
          <Header className='chatheader' />
        </div>
      </div>
    </div>
  );
};

const Initial = () => {
  const [showChat, setShowChat] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTransition = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowChat(true);
    }, 500); // Match this with CSS transition duration
  };

  const ihandleSubmit = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
    setShowChat(true);
  };

  return (
    <div className="transition-wrapper">
      <div className={`page-container ${isAnimating ? 'fade-out' : ''} ${showChat ? 'hidden' : ''}`}>
        <div className='icontainer'>
          <Header className='chatheader'/>
          <Header2 />
          <Loadpopup />
          <div className='initialdiv'>
            <h1 className='ihead'>Hi, How can I help you?</h1>
            <form className='ichat-input-form'>
              <input
                type='text'
                onChange={(e) => {
                  ihandleSubmit(e);
                  handleTransition();
                }}
                placeholder='Type your question...'
                className='ivinput'
              />
            </form>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div className={`page-container ${showChat ? 'fade-in' : 'hidden'}`}>
        <PrivateRoute><Chat userInput={userInput} /></PrivateRoute>
      </div>
    </div>
  );
};

export default Initial;