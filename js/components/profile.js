'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  Component,
  SegmentedControlIOS
} from 'react-native';
import Instruments from './instruments';

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
        activeView = <Text>Profile</Text>;
        break;
      case 'Instruments':
        console.log('right', this.props.navigator.rightButtonTitle);
        this.props.navigator.rightButtonTitle = 'New';
        console.log('right', this.props.navigator.rightButtonTitle);
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
          onChange={ event => { console.log(activeViews[event.nativeEvent.selectedSegmentIndex]); this.setState({view: activeViews[event.nativeEvent.selectedSegmentIndex]}); } }
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
