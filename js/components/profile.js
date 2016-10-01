'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  Component,
  SegmentedControlIOS
} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import Instruments from './instruments';
import ProfileDetails from './profileDetails';
import appStyles from '../styles/appStyles';

let activeViews = [ 'Profile', 'Instruments', 'Support' ];

class Profile extends Component {
  constructor (props) {
    super(props);

    this.render = this.render.bind(this);

    this.state = {
      view: activeViews[0]
    };
  }

  render () {
    let activeView;

    switch (this.state.view) {
      case 'Profile':
        activeView = <View>
          <ProfileDetails></ProfileDetails>
            <Text>{}</Text>
            <LoginButton
              onLogoutFinished={() => {
                this.props.parentNavigator.pop();
              }}
            />
          </View>;
        break;
      case 'Instruments':
        this.props.navigator.rightButtonTitle = 'New';
        activeView = <Instruments navigator={this.props.navigator} />;
        break;
      case 'Support':
        activeView = <Text>Support</Text>;
        break;
    }

    return (
      <View style={styles.container}>
        <SegmentedControlIOS
          values={activeViews}
          selectedIndex={0}
          tintColor={appStyles.constants.grayHighlight}
          onChange={ event => { this.setState({view: activeViews[event.nativeEvent.selectedSegmentIndex]}); } }
        />
        { activeView }
      </View>
    );
  }
}

Profile.propTypes = {
  navigator: React.PropTypes.object
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  }
});

module.exports = Profile;
