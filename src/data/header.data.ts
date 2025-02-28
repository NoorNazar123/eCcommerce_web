export type NavLinks = {
  id: number | string;
  name: string;
  path: string;
  liStyle?: string;
  ulStyle?: string;
};
export const navLinkData: NavLinks[] = [
  {
    id: 1,
    name: 'Home',
    path: '/',
  },
  {
    id: 2,
    name: 'Shop',
    path: '/products',
  },
  {
    id: 3,
    name: ' New Arrivals',
    path: '#',
  },
  {
    id: 4,
    name: 'Order',
    path: '/order',
  },
  {
    id: 5,
    name: 'Contact Us',
    path: '/about',
  },
];
