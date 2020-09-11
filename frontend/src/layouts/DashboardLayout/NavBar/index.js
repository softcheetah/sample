/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, matchPath, Link as RouterLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from "@material-ui/core";
import {
  ShoppingCart as ShoppingCartIcon,
  User as UserIcon,
  Layout as LayoutIcon,
  PieChart as PieChartIcon,
  Users as UsersIcon,
  List as ListIcon
} from "react-feather";

import { ROUTE_PATH } from "src/constants";
import NavItem from "./NavItem";

const sections = [
  {
    subheader : "REPORTS",
    items     : [
      {
        title : "Dashboard",
        icon  : PieChartIcon,
        href  : "/app/reports/dashboard"
      },
    ]
  },
  {
    subheader : "MANAGEMENT",
    items     : [
      {
        title : "Manage Customers",
        icon  : UsersIcon,
        href  : "/app/management/customers",
        items : [
          {
            title : "List Customers",
            href  : "/app/management/customers"
          },
          {
            title : "View Customer",
            href  : "/app/management/customers/1"
          },
          {
            title : "Edit Customer",
            href  : "/app/management/customers/1/edit"
          },
        ]
      },
      {
        title : "All Customers",
        icon  : ListIcon,
        href  : "/app/management/products",
      },
      {
        title : "Manage Products",
        icon  : ShoppingCartIcon,
        href  : "/app/management/orders",
        items : [
          {
            title : "Apex Charts",
            href  : "/app/extra/charts/apex"
          },
        ]
      },
    ]
  },
  {
    subheader : "ADMIN",
    items     : [
      {
        title : "Users",
        href  : "/app/extra/charts/apex",
        icon  : LayoutIcon,
        items : [
          {
            title : "Apex Charts",
            href  : "/app/extra/charts/apex"
          },
        ]
      },
      {
        title : "All Users",
        href  : ROUTE_PATH.USERS_LIST,
        icon  : ListIcon,
      },
      {
        title : "Create User",
        href  : ROUTE_PATH.USERS_CREATE,
        icon  : UserIcon,
      },
    ]
  },
];

function renderNavItems(items, pathname, depth = 0) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path  : item.href,
      exact : false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems(item.items, pathname, depth + 1)}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width  : 256,
    top    : 64,
    height : "calc(100% - 64px)"
  },
  avatar: {
    cursor : "pointer",
    width  : 64,
    height : 64
  }
}));

const NavBar = ({ auth, onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  if (!auth.user) return null;

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box p={2}>
          {sections.map(section => (
            <List
              key={section.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {section.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems(section.items, location.pathname)}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Box
            p={2}
            borderRadius="borderRadius"
            bgcolor="background.dark"
          >
            <Typography
              variant="h6"
              color="textPrimary"
            >
              Need Help?
            </Typography>
            <Link
              variant="subtitle1"
              color="secondary"
              component={RouterLink}
              to="/docs"
            >
              Check our docs
            </Link>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  auth          : PropTypes.object,
  onMobileClose : PropTypes.func,
  openMobile    : PropTypes.bool,
};

export default NavBar;
