CREATE TABLE "users" (
	"id"	bigserial UNIQUE,
	"type"	INTEGER NOT NULL,
	"first_name"	TEXT NOT NULL,
	"last_name"	TEXT NOT NULL,
	"company"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	"login"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	
	PRIMARY KEY("id")
);

CREATE TABLE "plans" (
	"id"	bigserial UNIQUE,
	"user_id"	bigserial NOT NULL,
	"name"	TEXT NOT NULL,
	"description"	TEXT,
	"url"	TEXT NOT NULL,
	
	"api_token"	TEXT,

	"scale_x"	NUMERIC,
	"scale_y"	NUMERIC,
	"scale_z"	NUMERIC,
	
	PRIMARY KEY("id"),
	FOREIGN KEY ("user_id") REFERENCES "users"("id")
);


CREATE TABLE "beacons" (
	"id"	bigserial UNIQUE,
	"plan_id"	bigserial NOT NULL,
	"name"	TEXT NOT NULL,
	"description"	TEXT,
	"uuid"	TEXT NOT NULL,
	"major"	INTEGER NOT NULL,
	"minor"	INTEGER NOT NULL,

	"x"	NUMERIC,
	"y"	NUMERIC,
	"z"	TEXT,

	"lattitude"	NUMERIC,
	"longitude"	NUMERIC,

	PRIMARY KEY("id"),
	FOREIGN KEY ("plan_id") REFERENCES "plans"("id")
);