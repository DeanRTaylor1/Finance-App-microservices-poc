import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

interface MobileNavProps {
  authItems: React.ReactElement[];
  navItems: React.ReactElement[];
  scale: string;
  mobileNavHandler: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    source?: string
  ) => void;
}

interface LogoProps {
  color?: string;
}

interface inputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  getInputs: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
}

type Methods = 'head' | 'options' | 'put' | 'post' | 'patch' | 'delete' | 'get';

interface useRequest {
  url: string;
  method: Methods;
  body: any;
  onSuccess: (data?: any) => void;
}

type currentUser = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

interface CustomPropsWithChildren extends PropsWithChildren {
  currentUser: currentUser;
}

interface PropsWithAuth {
  currentUser: currentUser;
}

interface FormerrorsProps {
  errors: string[];
}

type Article = {
  abstract: string;
  web_url: string;
  lead_paragraph: string;
  news_desk: string;
};

interface ArticleContainerProps {
  abstract: string;
  web_url: string;
  lead_paragraph: string;
  news_desk: string;
}

export type {
  MobileNavProps,
  LogoProps,
  inputProps,
  Methods,
  useRequest,
  CustomPropsWithChildren,
  currentUser,
  PropsWithAuth,
  FormerrorsProps,
  ArticleContainerProps,
  Article,
};
