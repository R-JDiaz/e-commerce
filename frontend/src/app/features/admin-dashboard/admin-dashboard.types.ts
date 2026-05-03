export type AdminSection =
  | 'analytics'
  | 'products'
  | 'orders'
  | 'users'
  | 'settings'
  | 'site-links'
  | 'chat-support';

export interface AdminSectionItem {
  key: AdminSection;
  label: string;
  description: string;
}

export interface AdminHeroMetric {
  label: string;
  value: string;
  helper: string;
}

export const ADMIN_SECTION_ITEMS: AdminSectionItem[] = [
  { key: 'analytics', label: 'Analytics', description: 'Sales and trends' },
  { key: 'products', label: 'Products', description: 'Catalog and edits' },
  { key: 'orders', label: 'Orders', description: 'Queue and status' },
  { key: 'users', label: 'Users', description: 'Accounts and roles' },
  { key: 'settings', label: 'Settings', description: 'Admin profile' },
  { key: 'site-links', label: 'Footer Links', description: 'Site content' },
  { key: 'chat-support', label: 'Chat Support', description: 'Customer inbox' },
];
