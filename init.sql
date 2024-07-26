CREATE TABLE "users" (
	"id"	bigserial UNIQUE,
	"user_role"	INTEGER NOT NULL,
	"first_name"	TEXT NOT NULL,
	"last_name"	TEXT NOT NULL,
	"company"	TEXT,
	"email"	TEXT NOT NULL UNIQUE,
	"login"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	
	PRIMARY KEY("id")
);