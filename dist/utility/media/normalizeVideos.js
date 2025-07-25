"use strict";
module.exports.normalizeVideos = (mediaVideos, liveVideos) => {
    const media = mediaVideos.map((video) => ({
        id: video.id,
        product_id: video.product_id,
        variation_id: video.variation_id || null,
        attribute_id: video.attribute_id || null,
        url: video.url,
        source: "video", // from media_table
    }));
    const live = liveVideos.map((video) => ({
        id: video.id,
        product_id: video.product_id,
        url: video.url,
        title: video.title,
        description: video.description,
        thumbnail_url: video.thumbnail_url,
        source: "clip", // from live_table
    }));
    return [...media, ...live];
};
