/**
 * Simple file-based database for MVP
 * In production, use PostgreSQL, MongoDB, etc.
 */

import fs from 'fs/promises';
import path from 'path';

const dbDir = path.join(process.cwd(), '.nafs-db');
const registrationsFile = path.join(dbDir, 'registrations.json');
const usersFile = path.join(dbDir, 'users.json');

// Ensure db directory exists
async function ensureDbDir() {
    try {
        await fs.mkdir(dbDir, { recursive: true });
    } catch (error) {
        console.error('Error creating db directory:', error);
    }
}

// Helper to read JSON file with default fallback
async function readJsonFile(filePath: string, defaultValue: any = []) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return defaultValue;
    }
}

// Helper to write JSON file
async function writeJsonFile(filePath: string, data: any) {
    await ensureDbDir();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Registration storage
export async function saveRegistration(registration: any) {
    const registrations = await readJsonFile(registrationsFile, []);
    registrations.push({
        ...registration,
        createdAt: new Date().toISOString(),
    });
    await writeJsonFile(registrationsFile, registrations);
    return registration;
}

export async function getRegistration(id: string) {
    const registrations = await readJsonFile(registrationsFile, []);
    return registrations.find((r: any) => r.id === id);
}

export async function updateRegistration(id: string, updates: any) {
    const registrations = await readJsonFile(registrationsFile, []);
    const index = registrations.findIndex((r: any) => r.id === id);
    if (index !== -1) {
        registrations[index] = { ...registrations[index], ...updates };
        await writeJsonFile(registrationsFile, registrations);
        return registrations[index];
    }
    return null;
}

export async function getAllRegistrations() {
    return readJsonFile(registrationsFile, []);
}

// User storage (for admin/school login)
export async function saveUser(user: any) {
    const users = await readJsonFile(usersFile, []);
    users.push({
        ...user,
        createdAt: new Date().toISOString(),
    });
    await writeJsonFile(usersFile, users);
    return user;
}

export async function getUserByEmail(email: string) {
    const users = await readJsonFile(usersFile, []);
    return users.find((u: any) => u.email === email);
}

export async function getAllUsers() {
    return readJsonFile(usersFile, []);
}

// Create default users for demo
export async function initializeDefaultUsers() {
    const users = await readJsonFile(usersFile, []);

    // Check if demo users already exist
    const adminExists = users.some((u: any) => u.email === 'admin@educonf.com');
    const schoolExists = users.some((u: any) => u.email === 'school@example.com');

    if (!adminExists) {
        await saveUser({
            id: 'admin-1',
            email: 'admin@educonf.com',
            password: 'admin123', // In production, hash this!
            role: 'admin',
            name: 'Admin User',
        });
    }

    if (!schoolExists) {
        await saveUser({
            id: 'school-1',
            email: 'school@example.com',
            password: 'school123', // In production, hash this!
            role: 'school',
            schoolName: 'Demo High School',
        });
    }
}
