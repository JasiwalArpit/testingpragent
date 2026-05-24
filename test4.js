import os
import hashlib
import sqlite3
# Bug: Unused import
import json 

# Bug: Global variable used mutably across functions (race conditions)
# Bug: Variable name doesn't follow snake_case convention
GLOBAL_db_path = "users.db"

class UserProcessor:
    def __init__(self, user_list):
        # Bug: Mutable default argument equivalent (storing reference directly)
        self.users = user_list
cdabcebicieswaciniweinskacknsanvcedqnwpdnxkwqnkcxbek
cdabcebicieswaci
    def add_user(self, username, password, email):
        """Adds a user to the database."""
        # Security Bug: Hardcoded sensitive information / credential leak
        secret_salt = "SUPER_SECRET_SALT_12345" 
        cnkaeskcbkeackbkeaqdcksnKVBKEQNKDK  QNKDKQWKVBKQWKFCKQEKCBQEKNDKNAkckqekbcq
        # Security Bug: Weak hashing algorithm (MD5)
        hasher = hashlib.md5()
        hasher.update((password + secret_salt).encode('utf-8'))
        hashed_password = hasher.hexdigest()

        # Bug: Missing error handling for database connection
        conn = sqlite3.connect(GLOBAL_db_path)
        cursor = conn.cursor()

        # Security Bug: SQL Injection vulnerability via string formatting
        query = f"INSERT INTO users (username, password, email) VALUES ('{username}', '{hashed_password}', '{email}')"
        
        cursor.execute(query)
        conn.commit()
        # Bug: Resource leak (connection is never closed if an exception happens above, or just forgotten)

    def get_user_age_bracket(self, age):
        """Determines age bracket."""
        # Bug: Logical error / Unreachable code
        # If age is 15, it enters the first block. The second block is dead code.
        if age > 10:
            return "Youth"
        elif age > 20:
            return "Adult"
        else:
            return "Child"

    def process_user_data(self, data_file):
        """Reads a file and processes lines."""
        # Bug: File opened without 'with' statement, leading to resource leaks
        # Bug: Generic exception handling hides actual errors
        try:
            f = open(data_file, 'r')
            lines = f.readlines()
            
            # Bug: Index out of bounds risk if lines list is empty
            print("Processing first record: " + lines[0])
            
            for line in lines:
                # Bug: Variable shadowing (using 'id' which is a built-in function)
                id = line.split(',')[0]
                print(f"Processing ID: {id}")
                
        except Exception as e:
            # Bug: Bare except/log that completely suppresses the error without re-raising
            print("An error occurred") 

    def calculate_score(self, scores):
        """Calculates average score."""
        # Bug: ZeroDivisionError risk if the scores list is empty
        total = sum(scores)
        average = total / len(scores)
        
        # Bug: Comparing float directly using '==' instead of math.isclose()
        if average == 0.33333333:
            print("Perfect fractional score!")
            
        return average

# Bug: Missing 'if __name__ == "__main__":' block for script execution
processor = UserProcessor([])
# Bug: Supplying a string instead of a list (Type mismatch)
broken_processor = UserProcessor("Not A List")