import { SetStateAction } from "react";

export interface Event {
  title: string;
  start: Date;
  end: Date;
};

export interface AppointmentType {
  vaccine: string;
  date: string
};


export interface propsType {
  selectedDate: string;
  handleSubmit: () => void;
  setFormData: (data: SetStateAction<AppointmentType>) => void;
  formData: AppointmentType
};

export interface AppointmentsPropType {
    _id: string,
    name: string,
    status: string,
    vaccine: string,
    link: string,
    date: string
};

export interface paginationType{
  limit: string,
  page:string,
  totalItems:string,
  totalPage:string
  sort_type: string,
  sort_by: string,
  search: string,
  status: string
}

export interface tablePropType {
  data: AppointmentsPropType[],
  pagination: paginationType,
  links: {
    self: string,
    prev?: string
    next?: string
  }
  setPagination: (data: SetStateAction<paginationType>) => void;
};

export interface rowDataType {
    _id: string,
    name: string,
    status: string,
    vaccine: string,
    link: string,
    date: string,
}

export interface ChildComponentProps {
  setModalVisible: (data: SetStateAction<{ view: boolean; delete: boolean; edit: boolean; }>) => void;
  currentItem: string
}