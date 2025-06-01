
const express = require('express');
const router = express.Router();
// const { getDashboards, getDashboard, createDashboard, updateDashboard, deleteDashboard } = require('../controllers/dashboardController');
// const { protect } = require('../middleware/authMiddleware');

// Get all dashboards
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: 2,
        data: {
            dashboards: [
                {
                    id: 1,
                    name: 'Main Dashboard',
                    description: 'Main EHB System Dashboard',
                    layout: 'grid',
                    is_default: true,
                    widgets: [],
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'Analytics Dashboard',
                    description: 'System Analytics Dashboard',
                    layout: 'grid',
                    is_default: false,
                    widgets: [],
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ]
        }
    });
});

// Get a single dashboard
router.get('/:id', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            dashboard: {
                id: parseInt(req.params.id),
                name: 'Main Dashboard',
                description: 'Main EHB System Dashboard',
                layout: 'grid',
                is_default: true,
                widgets: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        }
    });
});

// Create a new dashboard
router.post('/', (req, res) => {
    res.status(201).json({
        status: 'success',
        data: {
            dashboard: {
                id: 3,
                name: req.body.name,
                description: req.body.description,
                layout: req.body.layout || 'grid',
                is_default: req.body.is_default || false,
                widgets: req.body.widgets || [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        }
    });
});

module.exports = router;
