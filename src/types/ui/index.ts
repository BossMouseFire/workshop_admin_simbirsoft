import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import { ICity } from '../actions/cities';
import { IOrderStatus } from '../actions/orderStatuses';
import { ICategory } from '../actions/categories';

export interface IInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isError: boolean;
  refInput?: React.MutableRefObject<HTMLInputElement>;
}

export interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  color?: string;
  size: 's' | 'm';
}

export interface ISelect
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  data: dataSelect;
  allPoints?: string;
  sizeSelect: 'auto' | '10';
}

type dataSelect = ICity[] | IOrderStatus[] | ICategory[];

export type ICheckBox = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
