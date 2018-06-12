import React from 'react';
import Typography from '@material-ui/core/Typography';

//SVG Icons were created by amCharts (https://www.amcharts.com/)
//Creative Commons Attribution 4.0 International Public License
import CloudyIcon from '../media/weatherIcons_animated/cloudy.svg';
import ThunderIcon from '../media/weatherIcons_animated/thunder.svg';
import RainyIcon_6 from '../media/weatherIcons_animated/rainy-6.svg';
import RainyIcon_4 from '../media/weatherIcons_animated/rainy-4.svg';
import RainyIcon_5 from '../media/weatherIcons_animated/rainy-5.svg';
import SnowyIcon_5 from '../media/weatherIcons_animated/snowy-5.svg';
import ClearIcon from '../media/weatherIcons_animated/day.svg';

class WeatherTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props.data //TODO: select correct icon https://openweathermap.org/weather-conditions
    }
  }

  render() {
    return (
      <div>
        <Typography variant="display2" component="h3">{this.props.data.name}</Typography>
        {(() => {
              switch (true) {
                case (this.props.data.weather[0].id >= 200 && this.props.data.weather[0].id <= 232):
                  return (
                    <div>
                      <img src={ThunderIcon} alt='logo'/>
                    </div>
                  );
                case (this.props.data.weather[0].id >= 300 && this.props.data.weather[0].id <= 321):
                  return (
                    <div>
                      <img src={RainyIcon_4} alt='logo'/>
                    </div>
                  );
                case (this.props.data.weather[0].id >= 500 && this.props.data.weather[0].id <= 504):
                  return (
                    <div>
                      <img src={RainyIcon_5} alt='logo'/>
                    </div>
                  );
                case (this.props.data.weather[0].id >= 511 && this.props.data.weather[0].id <= 531):
                  return (
                    <div>
                      <img src={RainyIcon_6} alt='logo'/>
                    </div>
                  );
                case (this.props.data.weather[0].id >= 600 && this.props.data.weather[0].id <= 622):
                  return (
                    <div>
                      <img src={SnowyIcon_5} alt='logo'/>
                    </div>
                  );
                case (this.props.data.weather[0].id >= 701 && this.props.data.weather[0].id <= 781):
                  return (
                    <div>
                      <img src={CloudyIcon} alt='logo'/> {/*TODO: atmosphere icons*/}
                    </div>
                  );
                case (this.props.data.weather[0].id === 800):
                  return (
                    <div>
                      <img src={ClearIcon} alt='logo'/>
                    </div>
                  );
                case (this.props.data.weather[0].id >= 801 && this.props.data.weather[0].id <= 804):
                  return (
                    <div>
                      <img src={CloudyIcon} alt='logo'/>
                    </div>
                  );
                default:
                  return (
                    <div>
                      <p>Clear</p>
                    </div>
                  );
              }
            })()}
        <Typography variant="headline" component="h3">Temperature: {this.state.data.main.temp - 273.15} &#8451;</Typography>
        <Typography variant="headline" component="h3">Description: {this.props.data.weather[0].description}</Typography>
        <Typography variant="headline" component="h3">Humidity: {this.props.data.main.humidity} %</Typography>
        <Typography variant="headline" component="h3">Wind: {Math.round((this.props.data.wind.speed * 0.44704) * 100) / 100} m/s</Typography>
      </div>
    );
  }
}

export default WeatherTab;