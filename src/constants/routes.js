export const ROUTES = {
  PRESENTATION: '/presentation',
  PAINTING: '/peintures',
  SCULPTURE: '/sculptures',
  DRAWING: '/dessins',
  CONTACT: '/contact',
  HOME: '/',
  PRIVACY: '/politique-de-confidentialite',
  REGISTER: '/register',
  SIGNOUT: '/signout',
  SIGNIN: '/signin',
  ADMIN: '/admin',
  A_PRESENTATION: '/admin/presentation',
  A_PAINTING: '/admin/peintures',
  A_SCULPTURE: '/admin/sculptures',
  A_DRAWING: '/admin/dessins',
  A_CONTACT: '/admin/contact',
  A_HOME: '/admin/accueil',
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

export const MENU_1 = [
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
];

export const MENU_2 = [
  {
    PATH: ROUTES.PRESENTATION,
    NAME: NAMES.PRESENTATION,
  },
  {
    PATH: ROUTES.HOME,
    NAME: NAMES.HOME,
  },
  {
    PATH: ROUTES.CONTACT,
    NAME: NAMES.CONTACT,
  },
];
