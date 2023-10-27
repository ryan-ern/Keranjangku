import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../redux/actions";

export function Redirect({ to }) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
}

export default function Authenticated({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAuth()).then((response) => {
            if (!response.isLogin) {
                navigate("/login");
            } else {
                navigate("/panel")
            }
        });
    }, [dispatch, navigate]);

    return children;
}
