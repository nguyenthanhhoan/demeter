import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'User Management',
    icon: 'nb-person',
    link: '/pages/user',
    children: [
      {
        title: 'User',
        link: '/pages/user',
      },
    ],
  },
  {
    title: 'Demeter Family',
    icon: 'nb-person',
    link: '/pages/family',
    children: [
      {
        title: 'Package',
        link: '/pages/family/package',
      },
    ],
  },
  {
    title: 'Demeter Corporation',
    icon: 'ion-briefcase',
    link: '/pages/corporation',
    children: [
      {
        title: 'Project',
        link: '/pages/corporation/project',
      },
      {
        title: 'Zone',
        link: '/pages/corporation/zone',
      },
      {
        title: 'Camera',
        link: '/pages/corporation/camera',
      },
      {
        title: 'Gateway',
        link: '/pages/corporation/gateway',
      },
    ],
  },
  {
    title: 'Testing',
    icon: 'ion-wrench',
    link: '/pages/testing',
    children: [
      {
        title: 'Notification',
        link: '/pages/testing/notification',
      },
    ],
  },
];
