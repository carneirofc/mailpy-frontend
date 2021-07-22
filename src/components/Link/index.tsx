import React from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, IconButton, PropTypes as MaterialPropTypes } from "@material-ui/core";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { LocationDescriptor } from "history";

interface LinkProps<T> {
  to: LocationDescriptor<T>;
}
interface ButtonLinkProps<T> extends LinkProps<T> {
  color?: MaterialPropTypes.Color;
}
interface IconButtonLinkProps<T> extends ButtonLinkProps<T> {
  icon: React.ReactElement;
}
interface ListItemLinkProps<T> extends LinkProps<T> {
  icon?: React.ReactElement;
  primary: string;
}

export function ListItemLink<T>(props: ListItemLinkProps<T>) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} style={{ textAlign: "center" }} />
      </ListItem>
    </li>
  );
}

export function IconButtonLink<T>(props: IconButtonLinkProps<T>) {
  const { icon, to, color } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <IconButton color={color ? color : "primary"} component={renderLink}>
      {icon}
    </IconButton>
  );
}

export function AddIconButtonLink<T>(props: ButtonLinkProps<T>) {
  return <IconButtonLink icon={<AddIcon />} {...props} />;
}
export function DeleteconButtonLink<T>(props: ButtonLinkProps<T>) {
  return <IconButtonLink icon={<DeleteIcon />} {...props} />;
}
