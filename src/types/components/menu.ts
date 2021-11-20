import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IActionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  active: boolean;
}
