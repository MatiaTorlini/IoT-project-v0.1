//#region 								I M P O R T S 
import '../css/main.css'
import React from 'react'
//#endregion

//#region							C O M P O N E N T 
export default function ComNavbar(
) {
	return (
		<>
			<nav className="navbar" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<a className="navbar-item" href="/">
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTNuGK13Gg7_WCkVjokYW47WAJWv-W_7k0mg&usqp=CAU" width="112" height="28" />
					</a>

					<a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div id="navbarBasicExample" className="navbar-menu">
					<div className="navbar-start">
						<a className="navbar-item">
							World
						</a>

						<a className="navbar-item">
							Documentation
						</a>

						<div className="navbar-item has-dropdown is-hoverable">
							<a className="navbar-link">
								More
							</a>

							<div className="navbar-dropdown">
								<a className="navbar-item">
									About
								</a>
								<a className="navbar-item">
									Contact
								</a>
								<hr className="navbar-divider" />
								<a className="navbar-item">
									Report an issue
								</a>
							</div>
						</div>
					</div>

					<div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons">
								<a className="button is-primary">
									<strong>Sign up</strong>
								</a>
								<a className="button is-light">
									Log in
								</a>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}
//#endregion