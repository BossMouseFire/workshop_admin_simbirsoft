import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  color?: string;
}
