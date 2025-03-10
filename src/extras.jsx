import { useState, useEffect } from 'react'; 
import './extras.css'


export const TypingAnimation = ({textLines}) => {
        const [text, setText] = useState('');
        const [index, setIndex] = useState(0);
        //const hasMount = useRef(false);
        
        
      
        const fullText = textLines.map(line => line.text).join('\n');
        
       
        useEffect(() => {
            //if (hasMount.current) return;
            //hasMount.current = true;
            const animateText = () => {
            if (index < fullText.length) {
              const timeout = setTimeout(() => {
                setText(current => current + fullText[index]);
                setIndex(index + 1);
              }, 100);
              
              return timeout;
            }
          };
      
          const timeout = animateText();
          return () => {
            if (timeout) clearTimeout(timeout);
          };
        }, [index]);
        const renderFormattedText = () => {
          let currentPos = 0;
          return textLines.map((line, i) => {
            const lineLength = line.text.length;
            const currentText = text.slice(currentPos, currentPos + lineLength);
            currentPos += lineLength + 1;
            return (
              <div key={i} className={`${line.className}`}>
                {currentText}
              </div>
            );
          });
        };
        return (
          <div className="progtext">
            {renderFormattedText()}
          </div>
        );
      };
