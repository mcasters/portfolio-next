export const ROUTES = {
  PRESENTATION: '/presentation',
  PAINTING: '/peintures',
  SCULPTURE: '/sculptures',
  DRAWING: '/dessins',
  CONTACT: '/contact',
  HOME: '/',
  PRIVACY: '/politique-de-confidentialite',
  REGISTER: '/register',
  ADMIN: '/admin',
  SIGNOUT: '/signout',
  SIGNIN: '/signin',
};

export const NAMES = {
  PRESENTATION: 'Présentation',
  PAINTING: 'Peintures',
  SCULPTURE: 'Sculptures',
  DRAWING: 'Dessins',
  CONTACT: 'Contact',
  HOME: 'Home',
  PRIVACY: 'Privacy',
  PRIVACY_FRENCH: 'Politique de confidentialité',
  REGISTER: 'Register',
  ADMIN: 'Admin',
  SIGNOUT: 'Admin out',
  SIGNIN: 'Admin in',
};

export const MENU = [
  {
    PATH: ROUTES.PRESENTATION,
    NAME: NAMES.PRESENTATION,
  },
  {
    PATH: ROUTES.PAINTING,
    NAME: NAMES.PAINTING,
  },
  {
    PATH: ROUTES.SCULPTURE,
    NAME: NAMES.SCULPTURE,
  },
  {
    PATH: ROUTES.DRAWING,
    NAME: NAMES.DRAWING,
  },
  {
    PATH: ROUTES.CONTACT,
    NAME: NAMES.CONTACT,
  },
  {
    PATH: ROUTES.HOME,
    NAME: NAMES.HOME,
  },
];
