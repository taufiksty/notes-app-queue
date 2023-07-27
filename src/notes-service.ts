import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const NotesService = {
	getNotes: async ({ userId }: { userId: string }) => {
		const query = {
			text: `SELECT "Note".*
                   FROM "Note"
                   LEFT JOIN "Collaboration" ON "Collaboration"."noteId" = "Note"."id"
                   WHERE "Note"."owner" = $1 OR "Collaboration"."userId" = $1
                   GROUP BY "Note"."id";
                   `,
			values: [userId],
		};

		const result = await pool.query(query);
		console.log(result.rows);

		return result.rows;
	},
};

export default NotesService;
