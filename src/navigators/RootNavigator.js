import {StackNavigator} from 'react-navigation';
import MainScreen from "../screens/main/MainScreen";
import DetailsScreen from "../screens/details/DetailsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const RootNavigator = StackNavigator({
    Main: {
        screen: MainScreen,
    },
    Details: {
        screen: DetailsScreen,
    },
    Profile: {
        screen: ProfileScreen,
    },
});

export default RootNavigator;