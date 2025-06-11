const { pool } = require("../../connection/db");

module.exports.getVariationAttributes = async (variationId) => {
  const [attributes] = await pool.query(`
    SELECT 
      va.attribute_id,
      va.label AS attribute_name,
      va.stock,
      va.value,
      va.weight,
      va.price,
      l.name AS layout_name,
      l.priority,
      m.url AS image
    FROM variation_attributes va
    JOIN attributes_table a ON va.attribute_id = a.id
    LEFT JOIN layouts_table l ON a.layout_id = l.id
    LEFT JOIN media_table m 
      ON m.variation_id = va.variation_id AND m.attribute_id = va.id AND m.type = 'image'
    WHERE va.variation_id = ?
  `, [variationId]);

  return attributes.map(attr => ({
    attribute_id: attr.attribute_id,
    name: attr.attribute_name,
    stock: attr.stock,
    image: attr.image, // Now coming from media_table
    value: attr.value,
    weight: attr.weight,
    price: attr.price,
    layout: {
      name: attr.layout_name,
      priority: attr.priority
    }
  }));
};