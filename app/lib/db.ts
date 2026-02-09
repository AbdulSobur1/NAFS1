/**
 * Postgres database access (Neon)
 */

import { neon } from '@neondatabase/serverless';
import { hashPassword } from '@/lib/auth';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  throw new Error(
    'Database connection string not configured. Set DATABASE_URL (or POSTGRES_URL).'
  );
}

const sql = neon(connectionString);

export interface RegistrationRecord {
  id: string;
  category: string;
  reference: string;
  amount: number;
  status: string;
  paystackReference?: string | null;
  paystackAccessCode?: string | null;
  data?: Record<string, any> | null;
  createdAt?: string;
  updatedAt?: string;
  verifiedAt?: string | null;
  failedAt?: string | null;
}

export interface UserRecord {
  id: string;
  email: string;
  password: string;
  role: string;
  schoolName?: string | null;
  registrationId?: string | null;
  name?: string | null;
  createdAt?: string;
}

// Registration storage
export async function saveRegistration(registration: RegistrationRecord) {
  const rows = await sql`
    INSERT INTO registrations (
      id,
      category,
      reference,
      amount,
      status,
      paystack_reference,
      paystack_access_code,
      data
    ) VALUES (
      ${registration.id},
      ${registration.category},
      ${registration.reference},
      ${registration.amount},
      ${registration.status},
      ${registration.paystackReference ?? null},
      ${registration.paystackAccessCode ?? null},
      ${registration.data ?? null}
    )
    RETURNING
      id,
      category,
      reference,
      amount,
      status,
      paystack_reference as "paystackReference",
      paystack_access_code as "paystackAccessCode",
      data,
      created_at as "createdAt",
      updated_at as "updatedAt",
      verified_at as "verifiedAt",
      failed_at as "failedAt";
  `;

  return rows[0];
}

export async function getRegistration(id: string) {
  const rows = await sql`
    SELECT
      id,
      category,
      reference,
      amount,
      status,
      paystack_reference as "paystackReference",
      paystack_access_code as "paystackAccessCode",
      data,
      created_at as "createdAt",
      updated_at as "updatedAt",
      verified_at as "verifiedAt",
      failed_at as "failedAt"
    FROM registrations
    WHERE id = ${id}
    LIMIT 1;
  `;

  return rows[0] ?? null;
}

export async function getRegistrationByReference(reference: string) {
  const rows = await sql`
    SELECT
      id,
      category,
      reference,
      amount,
      status,
      paystack_reference as "paystackReference",
      paystack_access_code as "paystackAccessCode",
      data,
      created_at as "createdAt",
      updated_at as "updatedAt",
      verified_at as "verifiedAt",
      failed_at as "failedAt"
    FROM registrations
    WHERE reference = ${reference}
       OR paystack_reference = ${reference}
    LIMIT 1;
  `;

  return rows[0] ?? null;
}

export async function updateRegistration(id: string, updates: Partial<RegistrationRecord>) {
  const status = updates.status ?? null;
  const verifiedAt = updates.verifiedAt ?? null;
  const failedAt = updates.failedAt ?? null;
  const data = updates.data ?? null;

  const rows = await sql`
    UPDATE registrations
    SET
      status = COALESCE(${status}, status),
      verified_at = COALESCE(${verifiedAt}, verified_at),
      failed_at = COALESCE(${failedAt}, failed_at),
      data = COALESCE(${data}, data),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING
      id,
      category,
      reference,
      amount,
      status,
      paystack_reference as "paystackReference",
      paystack_access_code as "paystackAccessCode",
      data,
      created_at as "createdAt",
      updated_at as "updatedAt",
      verified_at as "verifiedAt",
      failed_at as "failedAt";
  `;

  return rows[0] ?? null;
}

export async function getAllRegistrations() {
  return sql`
    SELECT
      id,
      category,
      reference,
      amount,
      status,
      paystack_reference as "paystackReference",
      paystack_access_code as "paystackAccessCode",
      data,
      created_at as "createdAt",
      updated_at as "updatedAt",
      verified_at as "verifiedAt",
      failed_at as "failedAt"
    FROM registrations
    ORDER BY created_at DESC;
  `;
}

// User storage (for admin/school login)
export async function saveUser(user: UserRecord) {
  const rows = await sql`
    INSERT INTO users (
      id,
      email,
      password,
      role,
      school_name,
      registration_id,
      name
    ) VALUES (
      ${user.id},
      ${user.email},
      ${user.password},
      ${user.role},
      ${user.schoolName ?? null},
      ${user.registrationId ?? null},
      ${user.name ?? null}
    )
    RETURNING
      id,
      email,
      password,
      role,
      school_name as "schoolName",
      registration_id as "registrationId",
      name,
      created_at as "createdAt";
  `;

  return rows[0];
}

export async function updateUserPassword(email: string, password: string) {
  const rows = await sql`
    UPDATE users
    SET password = ${password}
    WHERE email = ${email}
    RETURNING
      id,
      email,
      password,
      role,
      school_name as "schoolName",
      registration_id as "registrationId",
      name,
      created_at as "createdAt";
  `;

  return rows[0] ?? null;
}

export async function getUserByEmail(email: string) {
  const rows = await sql`
    SELECT
      id,
      email,
      password,
      role,
      school_name as "schoolName",
      registration_id as "registrationId",
      name,
      created_at as "createdAt"
    FROM users
    WHERE email = ${email}
    LIMIT 1;
  `;

  return rows[0] ?? null;
}

export async function getUserById(id: string) {
  const rows = await sql`
    SELECT
      id,
      email,
      password,
      role,
      school_name as "schoolName",
      registration_id as "registrationId",
      name,
      created_at as "createdAt"
    FROM users
    WHERE id = ${id}
    LIMIT 1;
  `;

  return rows[0] ?? null;
}

export async function getAllUsers() {
  return sql`
    SELECT
      id,
      email,
      password,
      role,
      school_name as "schoolName",
      registration_id as "registrationId",
      name,
      created_at as "createdAt"
    FROM users
    ORDER BY created_at DESC;
  `;
}

// Create default users for demo
export async function initializeDefaultUsers() {
  const rows = await sql`
    SELECT email
    FROM users
    WHERE email IN ('admin@educonf.com', 'school@example.com');
  `;

  const emails = new Set(rows.map((row: any) => row.email));

  if (!emails.has('admin@educonf.com')) {
    const password = await hashPassword('admin123');
    await saveUser({
      id: 'admin-1',
      email: 'admin@educonf.com',
      password,
      role: 'admin',
      name: 'Admin User',
    });
  }

  if (!emails.has('school@example.com')) {
    const password = await hashPassword('school123');
    await saveUser({
      id: 'school-1',
      email: 'school@example.com',
      password,
      role: 'school',
      schoolName: 'Demo High School',
    });
  }
}
