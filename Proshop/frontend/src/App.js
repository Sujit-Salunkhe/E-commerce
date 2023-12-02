import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./componets/Header";
import Footer from "./componets/Footer";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          {/* <HomeScreens/> */}
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
