/**
 * Fetch attachments by source and identifiers.
 * @param pool MySQL pool connection
 * @param source Source type ('chat', 'product', etc.)
 * @param identifiers Array of identifiers (e.g., chat message IDs)
 * @returns Record mapping each identifier to its attachments
 */
module.exports.getAttachmentsBySource = async (
  pool: any,
  source: string,
  identifiers: number[] | string[]
): Promise<
  Record<number | string, { url: string; type: string; name: string }[]>
> => {
  if (!identifiers || identifiers.length === 0) return {};

  try {
    const [rows] = await pool.query(
      `
        SELECT identifier, attachment AS url, type, name
        FROM attachment_table
        WHERE source = ? AND identifier IN (?)
        `,
      [source, identifiers]
    );

    const groupedAttachments: Record<number | string, any[]> = {};

    for (const row of rows) {
      if (!groupedAttachments[row.identifier]) {
        groupedAttachments[row.identifier] = [];
      }
      groupedAttachments[row.identifier].push({
        url: row.url,
        type: row.type,
        name: row.name,
      });
    }

    return groupedAttachments;
  } catch (error) {
    console.error(`Error fetching attachments for source "${source}":`, error);
    return {};
  }
};
