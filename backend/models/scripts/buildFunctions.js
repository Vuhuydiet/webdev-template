import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import fs from 'fs/promises';

import { Client } from 'pg';
import { client_encoding, connectionString } from 'pg/lib/defaults';

function getClient(database) {
  return new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`,

    client_encoding: 'UTF8',
  });
}

async function buildFunctions(sqlScript = 'scripts/functions.sql') {
  try {
    console.log(`INFO: reading '${sqlScript}' file(s)...`);
    const SQL = await fs.readFile(path.join(__dirname, sqlScript), 'utf8');

    console.log('INFO: building functions and procedures...');
    const newClient = getClient(process.env.DB_NAME);
    await newClient.connect();
    await newClient.query(SQL);
    await newClient.end();

    console.log("INFO: done building functions!");
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

buildFunctions();