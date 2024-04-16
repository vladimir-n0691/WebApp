import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { ACCESS_TOKEN_KEY } from "../common/constants";
import Main from "./Main";

export const App = () => {

  console.log("Rendering App")

  /*const dispath = useDispatch();

  const data = useSelector((state: AppState) => state.common.data);
  const [lData, setLData] = useState(data);
  const setDataFunc = () => dispath(setData(lData));

  useEffect(() => {
    console.log("Data was changed: " + data);
  }, [data]);*/

  const Page404 = () => <p>404 Not found</p>;
  const isLoggedIn: boolean = localStorage.getItem(ACCESS_TOKEN_KEY) != null;

  console.log("isLoggedIn: " + isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/*' element={isLoggedIn ? <Main/> : <Navigate to='/signin'/>} />
        <Route path='*' element={<Page404/>} />
      </Routes>
    </BrowserRouter>
  );
};
