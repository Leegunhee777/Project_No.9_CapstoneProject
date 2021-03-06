import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Box,
  AppBar, Toolbar, IconButton, Link, Typography,
  Button,
  TextField,
  InputAdornment,
  ButtonBase,
  Avatar,
  Popover,
  Divider,
  Fab,
} from '@material-ui/core'
import { Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Palette,
  ChevronLeft
} from '@material-ui/icons'
import { requestLogout } from '../../actions/auth'
import { handleDrawer } from '../../actions/sketch';
import {yujinserver} from '../../restfulapi'
import { push } from 'connected-react-router';
import ProductSearchBar from '../Product/ProductSearchBar';
import Logo from '../../../public/logo.png'
import RawNameAvatar from '../common/RawNameAvatar';

const useStyles = makeStyles((theme) => ({
  topbar: {
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    overflowX: 'auto',
    flexWrap: 'wrap'
  },
  logo: {
    width: theme.spacing(30),
    height: 'auto',
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
}));

const NavBar = ({menus, authStore, sketchOpened, handleDrawer, requestLogout, push }) => {
  const classes = useStyles();
  const [ adminMenu, setAdminMenu ] = useState(null)
  const [designMenu, setDesignMenu] = useState(null)
  const [popoverTarget, setPopoverTarget] = useState(null)
  const open = Boolean(popoverTarget);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if(authStore.session === "shopadmin"){
      setAdminMenu(
        <Link onClick={() => {pushTo("/shop/")}} color="primary" variant="h6" >πμΌνλͺ° κ΄λ¦¬ νμ΄μ§</Link>
      )
    }
    else if(authStore.session === "admin"){
      setAdminMenu(
        <Link onClick={() => {pushTo("/admin/")}} color="primary" variant="h6" >πνλ«νΌ κ΄λ¦¬ νμ΄μ§</Link>
      )
    }
    else {
      setAdminMenu(null)
    }
  }, [authStore.session])

  useEffect(() => {
    if(sketchOpened){
      setDesignMenu(
        <Button variant="outlined" size="small" onClick={() => handleDrawer()}>
          <ChevronLeft />λ«κΈ°
        </Button>
      )
    }
    else{
      setDesignMenu(
        <Button variant="contained" color="primary" size="small" onClick={() => handleDrawer()}>
          <Palette />μ½λνκΈ°
        </Button>
      )
    }
  }, [sketchOpened])

  const handleLogout = () => {
    requestLogout()
    closePopover()
    push("/")
  }
  const closePopover = () => {
    setPopoverTarget(null)
  }
  const pushTo = (url) => {
    push(url)
    closePopover()
  }

  return(
    <React.Fragment>
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar className={classes.topbar} alignItems="center">
          <Box flexGrow={1} display="flex" justifyContent="space-between" alignItems="center">
            <ButtonBase component={RouterLink} to="/">
              <Avatar src={Logo} className={classes.logo} variant="square" />
            </ButtonBase>
            <ProductSearchBar />
          </Box>
          <Box flexGrow={1} display="flex" justifyContent="flex-end" alignItems="center">
            <Button onClick={(event) => setPopoverTarget(event.target)} variant="contained" color="secondary" size="small"
            component={Box} mr={1}>
              <MenuIcon /> λ§μ΄νμ΄μ§
            </Button>
            {designMenu}
          </Box>
        </Toolbar>
        <Toolbar component="nav" variant="dense" className={classes.toolbar}>
          {menus.map(({component, path}) => (
              <Link onClick={() => push(path)}
              color="inherit"
              noWrap
              variant="body2"
              className={classes.toolbarLink}>{component}</Link>
          ))}
        </Toolbar>
      </AppBar>
      <Popover
      id={id}
      open={open}
      anchorEl={popoverTarget}
      onClose={() => closePopover()}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      transformOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Box p={1} display="flex" flexDirection="column">
          <Box display="flex" flexDirection="column" px={10} py={3} alignItems="center" justifyContent="center"  onClick={() => pushTo("/mypage/"+authStore.currentId)}>
            <ButtonBase onClick={() => pushTo("/mypage/"+userId)} >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box p={1}>
                  <RawNameAvatar name={authStore.currentUser} size={10} />
                </Box>
                <Typography variant="h6">{authStore.currentUser}</Typography>
              </Box>
            </ButtonBase>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column" p={1}>
            <Link onClick={() => pushTo("/mypage/"+authStore.currentId)} variant="h6" color="inherit" >λ§μ΄νμ΄μ§</Link>
            <Link onClick={() => pushTo("/mypage/"+authStore.currentId+"?page=design")} color="inherit" >πμΆμ²μ½λ κ³΅μ κΈ</Link>
            <Link onClick={() => pushTo("/mypage/"+authStore.currentId+"?page=community")} color="inherit" >πμ»€λ?€λν° κ²μκΈ</Link>
            <Link onClick={() => pushTo("/mypage/"+authStore.currentId+"?page=message")} color="inherit" >π¬μͺ½μ§ν¨</Link>
            <Link onClick={() => pushTo("/mypage/"+authStore.currentId+"?page=closet")} color="inherit" >β¨λμμ·μ₯</Link>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column" p={1}>
            <Link onClick={() => pushTo("/order/cart")} color="inherit" >πμ₯λ°κ΅¬λ</Link>
            <Link onClick={() => pushTo("/order/myorder")} color="inherit" >πμ£Όλ¬Ένν© / λ°°μ‘μ‘°ν</Link>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column" p={1}>
            {adminMenu}
            <Link onClick={handleLogout} color="inherit" >πλ‘κ·Έμμ</Link>
          </Box>
        </Box>
      </Popover>
    </React.Fragment>
  )
}

NavBar.propTypes = {
  menus: PropTypes.array,
}

const mapStateToProps = state => ({
  sketchOpened: state.sketch.opened,
  authStore: state.auth,
})

const mapDispatchToProps = dispatch => ({
  handleDrawer: () => dispatch(handleDrawer()),
  requestLogout: () => dispatch(requestLogout()),
  push: (url) => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)