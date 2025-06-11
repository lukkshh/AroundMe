import { Request, Response } from "express";

import { sequelize } from "../config/database";
import { Location } from "../models";

export const getAllLocations = (req: Request, res: Response) => {
  Location.findAll()
    .then((locations) => {
      return res.json(locations);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};

export const getNearbyLocations = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { lat, lon, distance = 500, type } = req.query;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Missing lat or lon query parameters" });
  }

  let query = `
    SELECT
      *,
      ST_Distance(location, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography) AS distance
    FROM locations
    WHERE ST_DWithin(
      location,
      ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography,
      :distance
    )
  `;

  if (type) {
    query += ` AND category IN (:type)`;
  }

  query += ` ORDER BY distance ASC `;

  try {
    const [results] = await sequelize.query(query, {
      replacements: {
        lat,
        lon,
        distance,
        type: Array.isArray(type)
          ? type
          : typeof type === "string"
          ? type.split(",")
          : [],
      },
    });
    return res.json(results);
  } catch (error) {
    console.error("Error in nearby query:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
