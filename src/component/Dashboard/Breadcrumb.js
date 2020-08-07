import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import './style/index.css'
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function SimpleBreadcrumbs() {
  return (
    <Breadcrumbs separator="> " aria-label="breadcrumb">
      <Link color="inherit" href="/" onClick={handleClick}>
        Admin
      </Link>
      <Typography color="textPrimary">Dashboard</Typography>
    </Breadcrumbs>
  );
}