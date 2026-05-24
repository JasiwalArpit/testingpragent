/**
 * Test File: productController.js
 * Focus: Express.js API, DB queries, and Async/Await bugs.
 */

const express = require('express');
const router = express.Router();
// BUG 1: Importing a heavy library but never using it (Dead import / Dependency bloat)
const lodash = require('lodash'); 
const pg = require('pg'); // PostgreSQL client

// Mock DB client configuration
const db = new pg.Client({ database: 'shop' });
db.connect();

// BUG 2: Callback parameter named 'res' and 'req' are swapped in order (Runtime crash)
router.get('/products/:id', async (res, req) => {
    try {
        const productId = req.params.id;

        // BUG 3: SQL Injection Vulnerability (Direct string concatenation instead of parameterized query)
        const query = `SELECT * FROM products WHERE id = '${productId}' AND status = 'active'`;
        
        // BUG 4: Missing 'await' keyword on an asynchronous DB call (Returns a Promise object instead of rows)
        const result = db.query(query);

        if (!result.rows || result.rows.length === 0) {
            // BUG 5: Express bug - Sending a response but forgetting to 'return', 
            // allowing execution to continue down to the next res.json() line (Headers already sent error)
            res.status(404).json({ error: 'Product not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        // BUG 6: Security flaw - Exposing raw database stack traces to the end user
        res.status(500).json({ message: "Database crashed", detail: error.stack });
    }
});

// BUG 7: Stored/Reflected XSS Vulnerability (Trusting user input directly without sanitization)
router.post('/products/review', async (req, res) => {
    const { user, comment, rating } = req.body;

    // BUG 8: Missing explicit Type Coercion / Vulnerable to prototype pollution or type confusion
    // If 'rating' is passed as an array or object, this logic behaves unpredictably
    if (rating > 5 || rating < 1) {
        return res.status(400).send("Invalid rating");
    }

    const reviewHtml = `<div class="user-review"><h3>${user}</h3><p>${comment}</p></div>`;

    // BUG 9: Race Condition / Concurrency Issue
    // Simulating writing to a shared global variable without thread-safety/locking in async context
    global.lastReviewSubmitted = reviewHtml;

    // BUG 10: Unhandled Promise Rejection (No try/catch block anywhere in this async route handler)
    await db.query('INSERT INTO reviews (content, rating) VALUES ($1, $2)', [reviewHtml, rating]);

    res.status(201).send({ status: "Review added", raw: reviewHtml });
});

// BUG 11: Performance Nightmare / Exponential Time Complexity (O(2^n))
// Fibonacci calculation blocking the single-threaded Node.js event loop entirely
function calculateProductDemandScore(n) {
    if (n <= 1) return n;
    return calculateProductDemandScore(n - 1) + calculateProductDemandScore(n - 2);
}

router.get('/products/analytics/demand', (req, res) => {
    const days = parseInt(req.query.days) || 10;
    
    // BUG 12: Passing un-capped user input directly into a CPU-heavy recursive function. 
    // If a user passes ?days=50, it will freeze the entire server (DoS vulnerability).
    const score = calculateProductDemandScore(days); 
    
    res.json({ demandScore: score });
});

// BUG 13: Memory leak via closures 
// Every time this endpoint is hit, a new function scope is retained in memory
let leakTracer = [];
router.get('/ping', (req, res) => {
    const bigData = new Array(1000000).fill('leak');
    leakTracer.push(function() {
        return bigData;
    });
    res.send("pong");
});

module.exports = router;