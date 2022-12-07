CREATE TABLE accounts (
	id serial PRIMARY KEY,
	username VARCHAR ( 255 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
);

CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    initials VARCHAR(5),
    owed int(255),
    lender_id
    CONSTRAINT FK_accounts FOREIGN KEY (lender_id) REFERENCES accounts (id)
)