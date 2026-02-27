/*
  Warnings:

  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PropertyCategory" AS ENUM ('SALE', 'RENT');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('APARTMENT', 'HOUSE', 'VILLA', 'PLOT', 'COMMERCIAL', 'OFFICE', 'SHOP', 'WAREHOUSE', 'FARMHOUSE', 'PENTHOUSE');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('AVAILABLE', 'UNDER_DISCUSSION', 'CLOSED', 'SOLD', 'RENTED');

-- CreateEnum
CREATE TYPE "ListerType" AS ENUM ('OWNER', 'AGENT', 'DEVELOPER');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('BUY', 'RENT', 'INVESTMENT');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('OPEN', 'MATCHED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ServiceProviderType" AS ENUM ('CA', 'LAWYER', 'CS', 'NOTARY', 'LOAN_ADVISOR');

-- CreateEnum
CREATE TYPE "TriangleLinkStatus" AS ENUM ('PENDING', 'BUYER_NOTIFIED', 'BUYER_INTERESTED', 'CONNECTED', 'CLOSED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('FEATURED_LISTING', 'AGENT_SUBSCRIPTION', 'SERVICE_FEE', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('INITIATED', 'PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PROPERTY_APPROVED', 'PROPERTY_REJECTED', 'REQUEST_APPROVED', 'REQUEST_REJECTED', 'TRIANGLE_LINK_CREATED', 'TRIANGLE_LINK_UPDATED', 'PROFILE_VERIFIED', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'SYSTEM');

-- CreateEnum
CREATE TYPE "AdminAction" AS ENUM ('USER_SUSPENDED', 'USER_UNSUSPENDED', 'PROPERTY_APPROVED', 'PROPERTY_REJECTED', 'REQUEST_APPROVED', 'REQUEST_REJECTED', 'AGENT_VERIFIED', 'SERVICE_PROVIDER_APPROVED', 'CONTENT_EDITED', 'DATA_EXPORTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'OWNER';
ALTER TYPE "Role" ADD VALUE 'TENANT';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_url" TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "agent_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "agency_name" TEXT,
    "service_areas" TEXT[],
    "experience" INTEGER NOT NULL DEFAULT 0,
    "specialization" TEXT[],
    "bio" TEXT,
    "profile_photo" TEXT,
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "contact_phone" TEXT,
    "contact_email" TEXT,
    "whatsapp_number" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_reviews" INTEGER NOT NULL DEFAULT 0,
    "active_listings" INTEGER NOT NULL DEFAULT 0,
    "successful_deals" INTEGER NOT NULL DEFAULT 0,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "approval_status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agent_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_provider_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "ServiceProviderType" NOT NULL,
    "business_name" TEXT,
    "location" TEXT NOT NULL,
    "state" TEXT,
    "address" TEXT,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "services" TEXT[],
    "education" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "contact_phone" TEXT,
    "contact_email" TEXT,
    "whatsapp_number" TEXT,
    "profile_photo" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total_reviews" INTEGER NOT NULL DEFAULT 0,
    "clients_served" INTEGER NOT NULL DEFAULT 0,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "availability" TEXT,
    "approval_status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_provider_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "property_type" "PropertyType" NOT NULL,
    "category" "PropertyCategory" NOT NULL,
    "price" DECIMAL(15,2) NOT NULL,
    "price_unit" TEXT NOT NULL DEFAULT 'total',
    "area_size" DOUBLE PRECISION NOT NULL,
    "area_unit" TEXT NOT NULL DEFAULT 'sqft',
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "parking" INTEGER,
    "floors" INTEGER,
    "year_built" INTEGER,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "address" TEXT,
    "pincode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "description" TEXT NOT NULL,
    "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "listed_by_id" TEXT NOT NULL,
    "lister_type" "ListerType" NOT NULL,
    "contact_name" TEXT,
    "contact_phone" TEXT,
    "contact_email" TEXT,
    "status" "PropertyStatus" NOT NULL DEFAULT 'AVAILABLE',
    "approval_status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "featured_until" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "inquiry_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_images" (
    "id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "request_type" "RequestType" NOT NULL,
    "title" TEXT NOT NULL,
    "budget_min" DECIMAL(15,2) NOT NULL,
    "budget_max" DECIMAL(15,2) NOT NULL,
    "preferred_property_type" "PropertyType"[],
    "preferred_locations" TEXT[],
    "preferred_state" TEXT,
    "min_area" DOUBLE PRECISION,
    "max_area" DOUBLE PRECISION,
    "min_bedrooms" INTEGER,
    "timeline" TEXT,
    "notes" TEXT,
    "requirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "posted_by_id" TEXT NOT NULL,
    "contact_preference" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'OPEN',
    "approval_status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_request_links" (
    "id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "agent_id" TEXT NOT NULL,
    "status" "TriangleLinkStatus" NOT NULL DEFAULT 'PENDING',
    "agent_note" TEXT,
    "buyer_response" TEXT,
    "notified_at" TIMESTAMP(3),
    "responded_at" TIMESTAMP(3),
    "connected_at" TIMESTAMP(3),
    "closed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_request_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "payment_type" "PaymentType" NOT NULL,
    "description" TEXT,
    "razorpay_order_id" TEXT,
    "razorpay_payment_id" TEXT,
    "razorpay_signature" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'INITIATED',
    "failure_reason" TEXT,
    "reference_type" TEXT,
    "reference_id" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "comment" TEXT,
    "property_id" TEXT,
    "agent_profile_id" TEXT,
    "service_provider_profile_id" TEXT,
    "is_approved" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "reference_type" TEXT,
    "reference_id" TEXT,
    "action_url" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_logs" (
    "id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "action" "AdminAction" NOT NULL,
    "description" TEXT,
    "target_type" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "previous_state" JSONB,
    "new_state" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_inquiries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "property_id" TEXT,
    "agent_id" TEXT,
    "is_resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolved_at" TIMESTAMP(3),
    "resolved_by" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agent_profiles_user_id_key" ON "agent_profiles"("user_id");

-- CreateIndex
CREATE INDEX "agent_profiles_user_id_idx" ON "agent_profiles"("user_id");

-- CreateIndex
CREATE INDEX "agent_profiles_is_verified_idx" ON "agent_profiles"("is_verified");

-- CreateIndex
CREATE INDEX "agent_profiles_approval_status_idx" ON "agent_profiles"("approval_status");

-- CreateIndex
CREATE INDEX "agent_profiles_service_areas_idx" ON "agent_profiles"("service_areas");

-- CreateIndex
CREATE UNIQUE INDEX "service_provider_profiles_user_id_key" ON "service_provider_profiles"("user_id");

-- CreateIndex
CREATE INDEX "service_provider_profiles_user_id_idx" ON "service_provider_profiles"("user_id");

-- CreateIndex
CREATE INDEX "service_provider_profiles_type_idx" ON "service_provider_profiles"("type");

-- CreateIndex
CREATE INDEX "service_provider_profiles_location_idx" ON "service_provider_profiles"("location");

-- CreateIndex
CREATE INDEX "service_provider_profiles_is_verified_idx" ON "service_provider_profiles"("is_verified");

-- CreateIndex
CREATE INDEX "service_provider_profiles_approval_status_idx" ON "service_provider_profiles"("approval_status");

-- CreateIndex
CREATE UNIQUE INDEX "properties_slug_key" ON "properties"("slug");

-- CreateIndex
CREATE INDEX "properties_listed_by_id_idx" ON "properties"("listed_by_id");

-- CreateIndex
CREATE INDEX "properties_property_type_idx" ON "properties"("property_type");

-- CreateIndex
CREATE INDEX "properties_category_idx" ON "properties"("category");

-- CreateIndex
CREATE INDEX "properties_status_idx" ON "properties"("status");

-- CreateIndex
CREATE INDEX "properties_approval_status_idx" ON "properties"("approval_status");

-- CreateIndex
CREATE INDEX "properties_state_city_locality_idx" ON "properties"("state", "city", "locality");

-- CreateIndex
CREATE INDEX "properties_price_idx" ON "properties"("price");

-- CreateIndex
CREATE INDEX "properties_is_featured_idx" ON "properties"("is_featured");

-- CreateIndex
CREATE INDEX "properties_is_deleted_idx" ON "properties"("is_deleted");

-- CreateIndex
CREATE INDEX "properties_latitude_longitude_idx" ON "properties"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "property_images_property_id_idx" ON "property_images"("property_id");

-- CreateIndex
CREATE INDEX "requests_posted_by_id_idx" ON "requests"("posted_by_id");

-- CreateIndex
CREATE INDEX "requests_request_type_idx" ON "requests"("request_type");

-- CreateIndex
CREATE INDEX "requests_status_idx" ON "requests"("status");

-- CreateIndex
CREATE INDEX "requests_approval_status_idx" ON "requests"("approval_status");

-- CreateIndex
CREATE INDEX "requests_preferred_locations_idx" ON "requests"("preferred_locations");

-- CreateIndex
CREATE INDEX "requests_budget_min_budget_max_idx" ON "requests"("budget_min", "budget_max");

-- CreateIndex
CREATE INDEX "requests_is_deleted_idx" ON "requests"("is_deleted");

-- CreateIndex
CREATE INDEX "property_request_links_property_id_idx" ON "property_request_links"("property_id");

-- CreateIndex
CREATE INDEX "property_request_links_request_id_idx" ON "property_request_links"("request_id");

-- CreateIndex
CREATE INDEX "property_request_links_agent_id_idx" ON "property_request_links"("agent_id");

-- CreateIndex
CREATE INDEX "property_request_links_status_idx" ON "property_request_links"("status");

-- CreateIndex
CREATE UNIQUE INDEX "property_request_links_property_id_request_id_agent_id_key" ON "property_request_links"("property_id", "request_id", "agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_razorpay_order_id_key" ON "payments"("razorpay_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_razorpay_payment_id_key" ON "payments"("razorpay_payment_id");

-- CreateIndex
CREATE INDEX "payments_user_id_idx" ON "payments"("user_id");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_payment_type_idx" ON "payments"("payment_type");

-- CreateIndex
CREATE INDEX "payments_razorpay_order_id_idx" ON "payments"("razorpay_order_id");

-- CreateIndex
CREATE INDEX "reviews_author_id_idx" ON "reviews"("author_id");

-- CreateIndex
CREATE INDEX "reviews_property_id_idx" ON "reviews"("property_id");

-- CreateIndex
CREATE INDEX "reviews_agent_profile_id_idx" ON "reviews"("agent_profile_id");

-- CreateIndex
CREATE INDEX "reviews_service_provider_profile_id_idx" ON "reviews"("service_provider_profile_id");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "notifications_is_read_idx" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "notifications"("created_at");

-- CreateIndex
CREATE INDEX "admin_logs_admin_id_idx" ON "admin_logs"("admin_id");

-- CreateIndex
CREATE INDEX "admin_logs_action_idx" ON "admin_logs"("action");

-- CreateIndex
CREATE INDEX "admin_logs_target_type_target_id_idx" ON "admin_logs"("target_type", "target_id");

-- CreateIndex
CREATE INDEX "admin_logs_created_at_idx" ON "admin_logs"("created_at");

-- CreateIndex
CREATE INDEX "contact_inquiries_email_idx" ON "contact_inquiries"("email");

-- CreateIndex
CREATE INDEX "contact_inquiries_is_resolved_idx" ON "contact_inquiries"("is_resolved");

-- CreateIndex
CREATE INDEX "contact_inquiries_created_at_idx" ON "contact_inquiries"("created_at");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_is_active_is_suspended_idx" ON "users"("is_active", "is_suspended");

-- AddForeignKey
ALTER TABLE "agent_profiles" ADD CONSTRAINT "agent_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_provider_profiles" ADD CONSTRAINT "service_provider_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_listed_by_id_fkey" FOREIGN KEY ("listed_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_posted_by_id_fkey" FOREIGN KEY ("posted_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_request_links" ADD CONSTRAINT "property_request_links_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_request_links" ADD CONSTRAINT "property_request_links_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_request_links" ADD CONSTRAINT "property_request_links_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_agent_profile_id_fkey" FOREIGN KEY ("agent_profile_id") REFERENCES "agent_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_service_provider_profile_id_fkey" FOREIGN KEY ("service_provider_profile_id") REFERENCES "service_provider_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
