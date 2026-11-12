/**
 * REAL After630 trips go here.
 *
 * This file is intentionally empty until the owner supplies verified trip
 * data. Do not add a trip here without confirmed: destination, dates,
 * origin cities, packages, prices (or explicit "price on enquiry"),
 * inclusions/exclusions and licensed images. See
 * handoff/ux/After630_Phase1_UX_Implementation_Spec.md §9 for the full list.
 *
 * When `AFTER630_TRIP_SOURCE=live` (see .env.example), only trips listed
 * here are shown to visitors — demo/QA fixtures never leak into production.
 */
import type { Trip } from "@/lib/trips/types";

export const realTrips: Trip[] = [];
