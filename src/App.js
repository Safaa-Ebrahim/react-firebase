import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import AppRouter from "./router/AppRouter";
import ToastInfo from "./components/common/toast";
import { showToast } from "./store/slices/toastSlice";

function App() {
  const toastMsg = useSelector((state) => state.toastInfo.msg);
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <AppRouter />
      {toastMsg && (
        <ToastInfo
          msg={toastMsg}
          show={toastMsg ? true : false}
          onDismissToast={() => dispatch(showToast(""))}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
{
  /* <GoogleSignIn /> */
}
{
  /*
<hr style={{ width: "400px" }} />
<Register setUser={setUser} auth={auth} updateUserName={updateUserName}/>
<Login auth={auth} />
<h4> User Logged In: </h4>
{user?.email}
<p>UserName: {user?.displayName} </p>
<button onClick={logout}> Sign Out </button> */
}
