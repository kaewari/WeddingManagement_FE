import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import { Button } from './Styles';

const BackToTop = () =>{

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
        setVisible(true)
        }
        else if (scrolled <= 300){
        setVisible(false)
        }
    };

    const backToTop = () =>{
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
            in place of 'smooth' */
        });
};

window.addEventListener('scroll', toggleVisible);

return (
	<Button>
	<FaArrowCircleUp onClick={backToTop}
	style={{display: visible ? 'inline' : 'none'}} />
	</Button>
);
}

export default BackToTop;
