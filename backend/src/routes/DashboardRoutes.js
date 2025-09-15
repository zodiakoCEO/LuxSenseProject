import {Router} from 'express';
import {getDevices, getIndex, postDashboardData} from '../controllers/dashboardController.js'

const router = Router();

router.get("/", getIndex)
router.get("/dashboard", getDevices);
router.post("/dashboard",postDashboardData);

export default router;