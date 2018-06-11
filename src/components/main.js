import React from 'react';
import PeugeotLogo from '../media/Peugeot_logo.svg';
import Button from '@material-ui/core/Button';

class MainMenu extends React.Component {

    render() {
        return (
            <div>
                {/*<h1>Main menu / Splash screen</h1>*/}
                <img src={PeugeotLogo} alt='logo'/>
                <Button 
                    color="primary"
                    onClick={() => {this.props.handleContent('Fullscreen')}}
                >
                    Enable fullscreen
                </Button>
            </div>
        );
    }
}

export default MainMenu;