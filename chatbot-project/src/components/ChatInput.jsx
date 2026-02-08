import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({chatMessages,setChatMessages}) {
        const [inputText,setInputText]=useState('');
        function saveInputText(event){
            setInputText(event.target.value);
        }
        function sendMessage(){
            if(!inputText.trim())
            return;

            const userMessage={
                message:inputText,
                sender:'user',
                id:crypto.randomUUID()
            };

            const loadingMessage={
                message:(
                    <img src="https://supersimple.dev/images/loading-spinner.gif"
                    className="loading-spinner"
                    />
                ),
                sender:'robot',
                id:'loading'
            };
            const newChatMessages = [
                ...chatMessages,userMessage,loadingMessage
            ]; 
            setChatMessages(newChatMessages);
            setInputText('');

            setTimeout(() => {
            const response = Chatbot.getResponse(inputText);

            setChatMessages([
            ...newChatMessages.filter(msg => msg.id !== 'loading'),
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);
        }, 800);
        }

        function handleKeyDown(event){
            if(event.key === 'Enter'){
                sendMessage();
            }
        }
        
            /* setChatMessages([
                ...newChatMessages,
                {
                    message:response,
                    sender:'robot',
                    id:crypto.randomUUID()
                }
            ]);*/
            
            //setInputText('');
            return (
        <div className="chat-input-container">
            <input 
                placeholder="Send the messsage to chatbot" 
                size="30" 
                onChange={saveInputText}
                value={inputText}
                className="chat-box"
                onKeyDown={handleKeyDown}
            />
            <button
            onClick={sendMessage}
            className="send-button"
            >Send</button>
        </div>
        );
    }