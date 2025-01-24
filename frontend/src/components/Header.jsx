import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src="/Logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top me-2"
                alt="Epochly logo"
              />
              Epochly
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {/* Add new routes here */}
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/timeline'>
                <Nav.Link>Explore Timeline</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/vr-museum'>
                <Nav.Link>VR Museum</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/chat'>
                <Nav.Link>Chat with characters</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/map'>
                <Nav.Link>Interactive map</Nav.Link>
              </LinkContainer>
              {/* Quizzes & Challenges Dropdown */}
              <NavDropdown title="Quizzes & Challenges" id="quizzes-challenges-dropdown">
                <LinkContainer to='/quiz'>
                  <NavDropdown.Item>Quizzes</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/leaderboard'>
                  <NavDropdown.Item>Leaderboard</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
