import { Router } from "express";

import {
  getAllLocations,
  getNearbyLocations,
} from "../controllers/location.controller";

const router = Router();

router.get("/locations", getAllLocations);
router.get("/locations/nearby", getNearbyLocations);

export default router;
