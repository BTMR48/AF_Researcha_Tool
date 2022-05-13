import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                (localStorage.getItem("studentAuthToken") || localStorage.getItem("adminAuthToken") )?(
                    <Component {...props} />
                ) : (
                    <Redirect to="/student/signin" />
                )
            }
        />
    );
};

export default PrivateRoute;