import express from 'express';
import {  generateRoadmap } from '../controllers/roadmapcontoller.js';

const router = express.Router();

router.post('/roadmap', generateRoadmap);

export default router;
