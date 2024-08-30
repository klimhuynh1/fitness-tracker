import {useState} from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    }

    return (
        <div>
            {isLogin ? <Login/> : <Register/>}
            <button onClick={toggleForm}>
                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
        </div>
    );    
};

export default Auth;