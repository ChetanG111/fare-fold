
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

console.log('\x1b[36m%s\x1b[0m', '\n🚀 KyronHQ SaaS Starter Setup (No-Docker Guide) 🚀\n');

// 1. Check .env
console.log('\x1b[33m%s\x1b[0m', '1️⃣  Environment Configuration');
if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
        fs.copyFileSync(envExamplePath, envPath);
        console.log('   ✅ Created .env file from .env.example');
    } else {
        console.error('   ❌ .env.example not found! Cannot create .env');
    }
} else {
    console.log('   ✅ .env file exists');
}

// 2. Check Database URL
console.log('\n\x1b[33m%s\x1b[0m', '2️⃣  Database Connection');
let envContent = '';
if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
}

const dbUrlMatch = envContent.match(/DATABASE_URL=(.*)/);
const currentDbUrl = dbUrlMatch ? dbUrlMatch[1].trim() : '';
const defaultUrl = 'postgres://postgres:postgres@localhost:5432/kyronhq';

if (!currentDbUrl || currentDbUrl === defaultUrl) {
    console.log('   ⚠️  It looks like you are using the default DATABASE_URL.');
    console.log('   Since we are NOT using Docker, you must provide your own PostgreSQL connection string.');
    console.log('   👉 Action: Open .env and update DATABASE_URL with your connection string.');
    console.log('      Examples:');
    console.log('      - Local Windows: postgres://postgres:password@localhost:5432/kyronhq');
    console.log('      - Neon/Supabase: postgres://user:pass@ep-xyz.region.aws.neon.tech/dbname?sslmode=require');
} else {
    console.log('   ✅ DATABASE_URL is set to a custom value.');
}

// 3. Migration Instructions
console.log('\n\x1b[33m%s\x1b[0m', '3️⃣  Database Migration');
console.log('   Once your database is running and connected in .env, run:');
console.log('   \x1b[32m$ bun run migrate:local\x1b[0m');
console.log('   (This will apply the schema, including the removal of Premium Purchase tables)');

// 4. Premium Purchase Removal Status
console.log('\n\x1b[33m%s\x1b[0m', '4️⃣  Clean Slate Status');
const schemaPath = path.join(__dirname, 'database', 'schema.ts');
const schemaContent = fs.existsSync(schemaPath) ? fs.readFileSync(schemaPath, 'utf8') : '';
if (!schemaContent.includes('premiumPurchase')) {
    console.log('   ✅ Premium Purchase features have been removed from the schema.');
} else {
    console.log('   ⚠️  Premium Purchase table still detected in schema.ts.');
}


// 5. Admin Setup
console.log('\n\x1b[33m%s\x1b[0m', '5️⃣  Admin Setup');
console.log('   To access the Super Admin Dashboard (/admin), you need an admin account.');
console.log('   1. Sign up in the app first.');
console.log('   2. Run: \x1b[32mbun run seed:admin <your-email>\x1b[0m');

console.log('\n\x1b[36m%s\x1b[0m', '🎉 Setup Instructions Complete! Follow the steps above to get started.\n');
