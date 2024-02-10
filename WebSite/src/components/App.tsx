import { Main } from "./Main";
import { General } from "./General";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";

export const App = () => {
  /*const dispath = useDispatch();

  const data = useSelector((state: AppState) => state.common.data);
  const [lData, setLData] = useState(data);
  const setDataFunc = () => dispath(setData(lData));

  useEffect(() => {
    console.log("Data was changed: " + data);
  }, [data]);*/

  const Home = () => <p>Home Content</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<General />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
