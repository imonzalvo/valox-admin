/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string;
  name?: string;
  company?: string | Company;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "companies".
 */
export interface Company {
  id: string;
  handle?: string;
  name?: string;
  configurations?: string | Configuration;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "configurations".
 */
export interface Configuration {
  id: string;
  name?: string;
  description?: string;
  image: string | Media;
  company?: string | Company;
  availableShippingOptions?: string[] | ShippingOption[];
  availablePaymentMethods?: string[] | PaymentMethod[];
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  prefix?: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes: {
    thumbnail: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    card: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    tablet: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "shippingOptions".
 */
export interface ShippingOption {
  id: string;
  name?: string;
  description?: string;
  price?: number;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "paymentMethods".
 */
export interface PaymentMethod {
  id: string;
  name?: string;
  description?: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  id: string;
  title?: string;
  price?: number;
  creator?: string | User;
  category?: string | Category;
  tags?: string[] | Tag[];
  image: string | Media;
  status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  roles?: ('admin' | 'seller')[];
  sites?: string[] | Site[];
  company?: string | Company;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sites".
 */
export interface Site {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: string;
  name?: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string;
  productsAmount: number;
  shippingCost: number;
  totalAmount: number;
  shippingOption: string | ShippingOption;
  paymentMethod: string | PaymentMethod;
  company?: string | Company;
  products?: string | OrderProduct;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  status?: 'unconfirmed' | 'pending' | 'payed' | 'shipped';
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orderProducts".
 */
export interface OrderProduct {
  id: string;
  quantity?: number;
  unitPrice: number;
  product: string | Product;
  order: string | Order;
  createdAt: string;
  updatedAt: string;
}
