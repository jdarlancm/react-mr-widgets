import React, {useState, useEffect} from "react";
import axios from 'axios';

const Convert = ({language, text}) => {
    
    const[translate, setTranlate] = useState('');
    const[debouncedText, setdebouncedText] = useState(text);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setdebouncedText(text);
        },500);

        return() => {
            clearTimeout(timerId);
        }
    },[text]);

    useEffect(() => {
        const doTranslation = async () => {
            const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2', 
            {}, 
            {
                params: {
                    q: debouncedText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
                }
            });

            setTranlate(data.data.translations[0].translatedText);
        };

        doTranslation();

    },[language, debouncedText]);

    return (
        <div>
            <h1 className="ui header">{translate}</h1>
        </div>
    );
};

export default Convert;