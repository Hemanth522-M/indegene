import React from 'react';


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FirstTab from './FirstTab';
import SecondTab from './SecondTab';
import Logo from '../media/indegeneLogo.jpg';
import './Styles.css';

function Home() {

    const [value, setValue] = React.useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const HomeLocation = () => {
        window.location.reload();
    }

    return(
        <div>
            <div className="heading">
                <img src={Logo} alt="" id="image" onClick={HomeLocation} />
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="First tab" />
                    <Tab label="Second tab" />
                </Tabs>
            </div>
            {value === 0 && <FirstTab /> }
            {value === 1 && <SecondTab /> }
        </div>
    )
}

export default Home;