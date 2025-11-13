import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserThunk } from "../redux/thunk/authThunk";

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const hasFetched = useRef(false);
  useEffect(() => {
    if (!hasFetched.current && !isAuthenticated) {
      dispatch(fetchCurrentUserThunk());
      hasFetched.current = true;
    }
  }, [dispatch]);

  return { user, isAuthenticated, loading, error };
}
