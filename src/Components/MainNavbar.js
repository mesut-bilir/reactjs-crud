import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Navbar,
	NavItem,
	Collapse,
	NavLink,
	Nav,
	NavbarBrand
} from 'reactstrap';
import AuthContext from './AuthContext.js'

const MainNavbar = () => (
	<AuthContext.Consumer>
		{({ loggedIn, handleLogOut }) => (
			<>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">CRUD APP</NavbarBrand>
					<Collapse isOpen={true} navbar>
						<Nav className="mr-auto" navbar>
							<NavItem>
								<NavLink href="/customer">Customers</NavLink>
							</NavItem>
							{!loggedIn ?
								<>
									<NavItem>
										<NavLink href="/login">Login</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="/register">Register</NavLink>
									</NavItem>
								</>
								:
								<NavItem>
									<NavLink href="#" onClick={() => handleLogOut()}>SignOut</NavLink>
								</NavItem>
							}
						</Nav>
					</Collapse>
				</Navbar>
				<br />
			</>
		)}
	</AuthContext.Consumer>
)

export default MainNavbar;
