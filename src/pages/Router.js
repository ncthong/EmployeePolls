import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const Router = ({children, loggedIn}) => {
    const redirectUrl = window.location.href.toString().split(window.location.host)[1];

    return loggedIn ? children : <Navigate to={`/employee-polls/login?redirectTo=${redirectUrl}`}/>;
};

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(Router);
