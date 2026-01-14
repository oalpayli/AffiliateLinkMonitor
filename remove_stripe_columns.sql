-- Remove old Stripe columns from UserSubscription table

ALTER TABLE "UserSubscription" 
  DROP COLUMN IF EXISTS "stripe_customer_id",
  DROP COLUMN IF EXISTS "stripe_subscription_id",
  DROP COLUMN IF EXISTS "stripe_price_id",
  DROP COLUMN IF EXISTS "stripe_current_period_end",
  DROP COLUMN IF EXISTS "stripe_cancel_at_period_end";

-- Stripe columns removed successfully!
