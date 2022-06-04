import { Redirect, Route } from "react-router-dom";

const SupervisorPrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                localStorage.getItem("supervisorAuthToken") ?(
                    <Component {...props} />
                ) : (
                    <Redirect to="/supervisor/signin" />
                )
            }
        />
    );
};


export default SupervisorPrivateRoute;