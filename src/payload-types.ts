/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
 export interface User {
    id: string;
    firstName: string;
    lastName: string;
    roles?: ('admin' | 'seller')[];
    categories?: string[] | Category[];
    sites?: string[] | Site[];
    email?: string;
    company?: string | Company
    resetPasswordToken?: string;
    resetPasswordExpiration?: string;
    loginAttempts?: number;
    lockUntil?: string;
    createdAt: string;
    updatedAt: string;
  }

  /**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Categorys".
 */
export interface Category {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    company?: string | Company
  }

export interface Company {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}