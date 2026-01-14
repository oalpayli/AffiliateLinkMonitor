-- Migration: Stripe to Dodo Payments
-- This SQL will update the UserSubscription table

-- Step 1: Add new Dodo Payments columns
ALTER TABLE "UserSubscription" 
  ADD COLUMN IF NOT EXISTS "dodo_customer_id" TEXT,
  ADD COLUMN IF NOT EXISTS "dodo_subscription_id" TEXT,
  ADD COLUMN IF NOT EXISTS "dodo_product_id" TEXT,
  ADD COLUMN IF NOT EXISTS "dodo_variant_id" TEXT,
  ADD COLUMN IF NOT EXISTS "dodo_current_period_end" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "dodo_status" TEXT,
  ADD COLUMN IF NOT EXISTS "dodo_cancel_at_period_end" BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- Step 2: Create unique indexes
CREATE UNIQUE INDEX IF NOT EXISTS "UserSubscription_dodo_customer_id_key" 
  ON "UserSubscription"("dodo_customer_id");

CREATE UNIQUE INDEX IF NOT EXISTS "UserSubscription_dodo_subscription_id_key" 
  ON "UserSubscription"("dodo_subscription_id");

-- Step 3: Drop old Stripe columns (OPTIONAL - run after confirming everything works)
-- ALTER TABLE "UserSubscription" 
--   DROP COLUMN IF EXISTS "stripe_customer_id",
--   DROP COLUMN IF EXISTS "stripe_subscription_id",
--   DROP COLUMN IF EXISTS "stripe_price_id",
--   DROP COLUMN IF EXISTS "stripe_current_period_end",
--   DROP COLUMN IF EXISTS "stripe_cancel_at_period_end";

-- Migration complete!
