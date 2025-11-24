import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserThunk } from "../redux/thunk/authThunk";

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchCurrentUserThunk());
    }
  }, []);

  return { user, isAuthenticated, loading, error };
}
