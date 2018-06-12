import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// eslint-disable-next-line
import PeugeotLogo from '../media/Peugeot_logo.svg';

class MainMenu extends React.Component {
    render() {
        return (
            <div>
                {/*<h1>Main menu / Splash screen</h1>*/}
                {/*<img src={PeugeotLogo} alt='logo'/>*/}
                <ArrowUpwardIcon 
                    color={this.props.forward ? 'primary' : 'disabled'}
                    style={{ fontSize: 120 }}
                    onClick={() => this.props.changeDirection(true)}
                />
                <br/>
                <ArrowDownwardIcon 
                    color={this.props.forward ? 'disabled' : 'primary'}  
                    style={{ fontSize: 120 }}
                    onClick={() => this.props.changeDirection(false)}
                />
            </div>
        );
    }
}

export default MainMenu;