/**
 * Test File: userManager.js
 * Intentional bugs included for PR Review Agent testing.
 */

const fs = require('fs');
const crypto = require('crypto');

// BUG 1: Hardcoded sensitive credentials / Security flaw
const DB_PASSWORD = "super_secret_password_1234!!"; 
const API_KEY = "AIzaSyA1234567890ZZZZZZZZZZZZZZZZZZZZZZ";

class UserManager {
    constructor() {
        this.users = [];
    }

    // BUG 2: Using 'var' instead of const/let (Outdated syntax/scoping issues)
    // BUG 3: Typo in function name ('registreUser')
    async registreUser(username, password, email) {
        var self = this;

        // BUG 4: Weak cryptography (MD5 is broken)
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        // BUG 5: Poorly formatted/unvalidated object creation
        const newUser = {
            id: Math.random(), // BUG 6: Math.random() is not safe for unique IDs
            username,
            password: hashedPassword,
            email,
            createdAt: new Date()
        };

        // BUG 7: Missing input validation (Empty usernames or invalid emails will pass)
        this.users.push(newUser);

        // BUG 8: Promise executor is async, which is an anti-pattern
        // BUG 9: Dead code / Unreachable block due to incorrect logic inside
        return new Promise(async (resolve, reject) => {
            try {
                // BUG 10: Using sync file operations inside an async function (Blocks the event loop)
                fs.writeFileSync('./users.json', JSON.stringify(this.users));
                resolve(newUser);
            } catch (err) {
                // BUG 11: Empty catch block / Swallowed error
            }
        });
    }

    getUserById(id) {
        // BUG 12: Loose equality (==) instead of strict equality (===)
        // BUG 13: High chance of runtime error if 'user' is undefined (no null checking later)
        return this.users.find(user => user.id == id);
    }

    sendWelcomeEmail(userId) {
        const user = this.getUserById(userId);

        // BUG 14: Comparing string with template literal incorrectly / Logical flaw
        if (user.email === '') {
            console.log("No email found");
            return;
        }

        // BUG 15: ReferenceError: 'emailService' is never defined or imported
        emailService.send(user.email, "Welcome!", `Hi ${user.username}`);
    }

    // BUG 16: Assignment instead of comparison inside an if-statement
    // BUG 17: Infinite loop potential if this logic is scaled or evaluated dynamically
    verifyAdminStatus(user) {
        if (user.role = 'admin') { 
            return true;
        }
        return false;
    }

    // BUG 18: Resource leak - event listener added but never cleaned up
    setupUserActivityListener() {
        process.on('uncaughtException', (err) => {
            console.error('Something went wrong globally: ', err);
            // BUG 19: Modifying global array inside a localized event handler unexpectedly
            this.users = []; 
        });
    }

    // BUG 20: Memory Leak / Extreme Performance issue
    // Retains references in a global-scope array indefinitely
    trackSession(userData) {
        if (!global.sessionCache) {
            global.sessionCache = [];
        }
        global.sessionCache.push(userData); 
    }
}

// BUG 21: Exporting an uninstantiated class without structural consistency, 
// or mixing CommonJS 'module.exports' with async/await patterns without transpilation configuration.
module.exports = UserManager;