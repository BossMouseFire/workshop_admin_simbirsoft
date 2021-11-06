import React, { DetailedHTMLProps } from 'react';
import { RouteProps } from 'react-router-dom';

export interface IProps extends DetailedHTMLProps<RouteProps, never> {
  children: React.ReactNode;
  isAuthenticated: boolean;
}
