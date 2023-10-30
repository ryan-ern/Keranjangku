import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../redux/actions/Auth";

export function Redirect({ to }) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
}

export default function Authenticated({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.dataAuth)
    useEffect(() => {
        dispatch(getAuth())
        if (!data?.isLogin) {
            navigate("/login")
        }
    }, [ navigate])
    return children;
}
