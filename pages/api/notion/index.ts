import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getNotion()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getNotion() {
    const notion = new Client({ auth: "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" });
    try {
      const response = await notion.databases.query({
        database_id: "1898625657d9809495c1f791220bc07d", // Replace with your database ID
        filter: {
          and: [
            {
              or: [
                {
                  property: 'Phone', // Phone property name
                  rich_text: {
                    equals: req.query.query as string, // Exact match
                  },
                },
                {
                  property: 'Order', // Order property name
                  rich_text: {
                    equals: req.query.query as string, // Exact match
                  },
                },
              ],
            },
          ],
        },
      });

      res.status(200).json(response.results);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Unexpected error' })
      }
    }
  }
}
