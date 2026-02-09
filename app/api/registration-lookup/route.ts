import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  throw new Error('Database connection string not configured');
}

const sql = neon(connectionString);

function formatRegistration(row: any) {
  const data = row.data || {};
  const category = row.category;

  const name =
    category === 'school'
      ? data.schoolName || data.contactName || 'School Registration'
      : `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.name || 'Registrant';

  const email = data.email || data.contactEmail || '';

  return {
    id: row.id,
    reference: row.reference,
    category,
    status: row.status,
    createdAt: row.created_at,
    name,
    email,
    tempPassword: data.tempPassword || null,
  };
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const rows = await sql`
    SELECT id, reference, category, status, data, created_at
    FROM registrations
    WHERE id = ${id}
    LIMIT 1;
  `;

  if (!rows[0]) {
    return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
  }

  return NextResponse.json({ registration: formatRegistration(rows[0]) });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, reference } = body;

  if (!email && !reference) {
    return NextResponse.json({ error: 'Missing search parameter' }, { status: 400 });
  }

  if (email) {
    const rows = await sql`
      SELECT id, reference, category, status, data, created_at
      FROM registrations
      WHERE lower(data->>'email') = lower(${email})
         OR lower(data->>'contactEmail') = lower(${email})
      ORDER BY created_at DESC
      LIMIT 1;
    `;

    if (!rows[0]) {
      return NextResponse.json({ registration: null });
    }

    return NextResponse.json({ registration: formatRegistration(rows[0]) });
  }

  const rows = await sql`
    SELECT id, reference, category, status, data, created_at
    FROM registrations
    WHERE upper(id) = upper(${reference})
       OR upper(reference) = upper(${reference})
       OR upper(coalesce(data->>'paystackReference','')) = upper(${reference})
    ORDER BY created_at DESC
    LIMIT 1;
  `;

  if (!rows[0]) {
    return NextResponse.json({ registration: null });
  }

  return NextResponse.json({ registration: formatRegistration(rows[0]) });
}
