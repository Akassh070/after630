import { siteConfig } from "@/lib/config";
import { realTrips } from "@/content/trips";
import { demoTrips } from "@/content/trips.demo";
import { qaTrips } from "@/content/trips.qa";
import type { Trip } from "./types";

/**
 * Single read path for trip data. Swapping this for a real API/CMS later
 * only means changing this file — nothing else in the app should import
 * content/trips*.ts directly.
 */
function allTripsForSource(): Trip[] {
  switch (siteConfig.tripSource) {
    case "live":
      return realTrips;
    case "qa":
      return [...realTrips, ...demoTrips, ...qaTrips];
    case "demo":
    default:
      return [...realTrips, ...demoTrips];
  }
}

/** Trips a visitor is allowed to see: published and not in draft status. */
export function getPublicTrips(): Trip[] {
  return allTripsForSource().filter((trip) => trip.published && trip.status !== "draft");
}

export function getTripBySlug(slug: string): Trip | undefined {
  return getPublicTrips().find((trip) => trip.slug === slug);
}

export function getAllSlugs(): string[] {
  return getPublicTrips().map((trip) => trip.slug);
}

/** Featured trips for the homepage "Upcoming Trips" section. */
export function getFeaturedTrips(limit = 3): Trip[] {
  const trips = getPublicTrips();
  const featured = trips.filter((trip) => trip.featured);
  const rest = trips.filter((trip) => !trip.featured);
  return [...featured, ...rest].slice(0, limit);
}

export function getRelatedTrips(trip: Trip, limit = 3): Trip[] {
  const others = getPublicTrips().filter((t) => t.id !== trip.id);
  const sameCategory = others.filter((t) => t.category === trip.category);
  const rest = others.filter((t) => t.category !== trip.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
