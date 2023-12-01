import { Container } from "react-bootstrap";
import Header from "./componets/Header";
import Footer from "./componets/Footer";
import HomeScreens from "./screens/HomeScreens";

const App = () => {
  return (
    <>
    <Header/>
    <main className="py-3">
      <Container>
        <HomeScreens/>
      </Container>
      
    </main>
    <Footer/>
    </>
  )
}

export default App

