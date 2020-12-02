CREATE TABLE "public"."users"("id" text NOT NULL, "email" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("email"), UNIQUE ("id")); COMMENT ON TABLE "public"."users" IS E'Users synced from Auth0';
