module.exports.getRecordedLiveVideosByStore = async (pool, store_id) => {
  const [rows] = await pool.query(
    `SELECT id, recorded_video_url AS url, product_id, title, description, thumbnail_url 
       FROM live_table 
       WHERE store_id = ? AND recorded_video_url IS NOT NULL`,
    [store_id]
  );

  // console.log("liveClip=>", rows);
  return rows;
};
