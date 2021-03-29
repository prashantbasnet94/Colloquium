import React, { Fragment, useEffect, useContext } from 'react';
import { useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { AuthContext } from '../../'
import IconButton from '@material-ui/core/IconButton';
import { loadUser } from '../../actions/user';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { classicNameResolver } from 'typescript';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import Profile from '../navbar/Profile';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import red from '@material-ui/core/colors/red';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
const drawerWidth = 170;
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	hide: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	linkstyle: {
		textDecoration: 'none',
		color: '#edf2fb',
	},
	menuText: {
		marginRight: 18,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		background: '#006BA6',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
}));

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
	const handleDrawerOpen = () => {
		console.log(open);
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const guestLink = (
		<div className={classes.root}>
			<AppBar position="static" color="primary">
				<Toolbar>
					<div className={classes.sectionMobile}>
						{/* <div className={classes.root} /> */}
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Drawer
							className={classes.drawer}
							variant="persistent"
							anchor="left"
							open={open}
							classes={{
								paper: classes.drawerPaper,
							}}
						>
							<div className={classes.drawerHeader}>
								<IconButton onClick={handleDrawerClose}>
									{theme.direction === 'ltr' ? (
										<ChevronLeftIcon />
									) : (
										<ChevronRightIcon />
									)}
								</IconButton>
							</div>
							<Divider />
							<List>
								<ListItem button>
									<Typography className={classes.menuText}>
										<Link to="/questions" className={classes.linkstyle}>
											<i class="fa fa-book" aria-hidden="true"></i>
											<span>Explore</span>{' '}
										</Link>
									</Typography>
								</ListItem>
								<ListItem button>
									<Typography className={classes.menuText}>
										<Link to="/register" className={classes.linkstyle}>
											{' '}
											<i class="fa fa-user-plus" aria-hidden="true"></i>
											<span>Register</span>{' '}
										</Link>
									</Typography>
								</ListItem>
								<ListItem button>
									<Typography className={classes.menuText}>
										<Link to="/login" className={classes.linkstyle}>
											{' '}
											<i class="fa fa-sign-in" aria-hidden="true"></i>
											<span>Login</span>{' '}
										</Link>
									</Typography>
								</ListItem>
							</List>
							<Divider />
						</Drawer>
					</div>
					<Typography variant="h5" className={classes.title}>
						<Link to="/" className={classes.linkstyle}>
							<i className="fas users"></i> Collab
						</Link>
					</Typography>
					<div className={classes.sectionDesktop}>
						<Typography className={classes.menuText}>
							<Link to="/questions" className={classes.linkstyle}>
								<i class="fa fa-book" aria-hidden="true"></i>
								<span>Explore</span>{' '}
							</Link>
						</Typography>

						<Typography className={classes.menuText}>
							<Link to="/register" className={classes.linkstyle}>
								{' '}
								<i class="fa fa-user-plus" aria-hidden="true"></i>
								<span>Register</span>{' '}
							</Link>
						</Typography>

						<Typography className={classes.menuText}>
							<Link to="/login" className={classes.linkstyle}>
								{' '}
								<i class="fa fa-sign-in" aria-hidden="true"></i>
								<span>Login</span>{' '}
							</Link>
						</Typography>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
	const authlink = (
		<AppBar position="static" style={{ background: 'primary' }}>
			<Toolbar>
				<div className={classes.sectionMobile}>
					{/* <div className={classes.root} /> */}
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Drawer
						className={classes.drawer}
						variant="persistent"
						anchor="left"
						open={open}
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						<div className={classes.drawerHeader}>
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === 'ltr' ? (
									<ChevronLeftIcon />
								) : (
									<ChevronRightIcon />
								)}
							</IconButton>
						</div>
						<Divider />
						<List>
							<ListItem button>
								<Typography className={classes.menuText}>
									<Link to="/questions" className={classes.linkstyle}>
										<i class="fa fa-book" aria-hidden="true"></i>
										<span>Explore</span>{' '}
									</Link>
								</Typography>
							</ListItem>
							<ListItem button>
								<Typography className={classes.menuText}>
									<Typography className={classes.menuText}>
										<Profile></Profile>
									</Typography>
								</Typography>
							</ListItem>
							<ListItem button>
								<Typography className={classes.menuText}>
									<a onClick={logout} href="/" className={classes.linkstyle}>
										<i className="fa fa-sign-out-alt"> </i>
										{'  '} <span>Logout</span>
									</a>
								</Typography>
							</ListItem>
						</List>
						<Divider />
					</Drawer>
				</div>
				<Typography className={classes.title} variant="h5" noWrap>
					<Link to="/" className={classes.linkstyle}>
						<i className="fas fa-users"></i> Collab
					</Link>
				</Typography>
				<div className={classes.sectionDesktop}>
					<Typography className={classes.menuText}>
						<Link to="/questions" className={classes.linkstyle}>
							<i class="fa fa-book" aria-hidden="true"></i>
							<span>Explore</span>{' '}
						</Link>
					</Typography>
					<Typography className={classes.menuText}>
						<Profile></Profile>
					</Typography>

					<Typography className={classes.menuText}>
						<a onClick={logout} href="/" className={classes.linkstyle}>
							<i className="fa fa-sign-out-alt"> </i>
							{'  '} <span>Logout</span>
						</a>
					</Typography>
				</div>
			</Toolbar>
		</AppBar>
	);

	if (isAuthenticated && !loading) {
		return <Fragment>{authlink}</Fragment>;
	} else {
		return <Fragment> {guestLink}</Fragment>;
	}
};
Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user,
});

export default connect(mapStateToProps, { logout, loadUser })(Navbar);
