import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { BsClipboard2Data } from "react-icons/bs";

import logo from "../assets/logo.png";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useSelector,useDispatch } from "react-redux";
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import SearchBox from "./SearchBox";
import { useCreateCartMutation} from '../slices/cartApiSlice'
import { clearCartItems } from "../slices/cartSlice";
const Header = () => {
  const {cartItems} = useSelector((state) => state.cart);
  const {userInfo} = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation();
  const [creteCartItems] = useCreateCartMutation();
  
  const logoutHandler = async() => {
    try {
      // await  creteCartItems({cartItems}).unwrap()
      await logoutApiCall().unwrap(); 
      dispatch(clearCartItems())
      dispatch(logout())
      navigate('/login')
        } catch (err) {
        console.log(err)
       }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="ZenCart" className="mr-20" height='50px'  width ='50px' />
            ZenCart
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <LinkContainer to="/cart">
              <Nav.Link >
                <FaShoppingCart />
                Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{marginLeft:'5px'}}>
                      {cartItems.reduce((a,c) => a + c.qty , 0)}
                  </Badge>
                )}
              </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to={'/profile'}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (<LinkContainer to='/login'>
              <Nav.Link to='/login'>
                <FaUser/>
                Sign In
              </Nav.Link>
              </LinkContainer>)}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.isAdmin && (
                <LinkContainer to = '/admin/data'>
                  <Nav.Link>
                    <BsClipboard2Data/>
                  {/* <i class="bi bi-database-check"></i> */}
                    Data
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
