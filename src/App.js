import Routes from "./routes/Routes.js";
import CustomRouter from "./routes/CustomRouter";
import History from "./routes/CustomHistory";

function App() {
  return (
    <>
      <CustomRouter history={History}>
        <Routes />
      </CustomRouter>
    </>
  );
}

export default App;
