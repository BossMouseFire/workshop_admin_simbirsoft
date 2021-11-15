import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import { ICity } from '../actions/cities';
import { IOrderStatus } from '../actions/orderStatuses';

export interface IInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isError: boolean;
}

export interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  color?: string;
}

export interface ISelect
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  data: dataSelect;
}

type dataSelect = ICity[] | IOrderStatus[];

export type ICheckBox = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
