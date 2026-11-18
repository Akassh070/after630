"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import {
  CATEGORY_LABELS,
  DEFAULT_FILTER_STATE,
  DURATION_LABELS,
  REGION_LABELS,
  SORT_LABELS,
  filterTrips,
  getFacetOptions,
  parseFilterState,
  serializeFilterState,
  type DurationBucket,
  type FacetOptions,
  type SortOption,
  type TripFilterState,
  sortTrips,
} from "@/lib/trips/filters";
import type { Trip, TripCategory, TripRegion } from "@/lib/trips/types";
import { useFocusTrap } from "@/lib/useFocusTrap";
import FeatureTripCard from "./FeatureTripCard";
import TripCard from "./TripCard";
import styles from "./trips.module.css";

const CATEGORY_ORDER: TripCategory[] = ["mountain", "road", "weekend", "culture"];
const DURATION_ORDER: DurationBucket[] = ["all", "short", "medium", "long"];

type FilterFieldsProps = {
  idPrefix: string;
  filterState: TripFilterState;
  facets: FacetOptions;
  onUpdate: (partial: Partial<TripFilterState>) => void;
};

/** Hoisted to module scope so it isn't re-created (and re-mounted) on every render. */
function FilterFields({ idPrefix, filterState, facets, onUpdate }: FilterFieldsProps) {
  return (
    <>
      <div className={styles.filterGroup}>
        <h3>Duration</h3>
        <div className={styles.radioList}>
          {DURATION_ORDER.map((bucket) => (
            <label key={bucket} className={styles.radioOption}>
              <input
                type="radio"
                name={`${idPrefix}-duration`}
                checked={filterState.duration === bucket}
                onChange={() => onUpdate({ duration: bucket })}
              />
              {DURATION_LABELS[bucket]}
            </label>
          ))}
        </div>
      </div>

      {facets.regions.length > 0 && (
        <div className={styles.filterGroup}>
          <h3>Region</h3>
          <select
            className={styles.selectField}
            aria-label="Filter by region"
            value={filterState.region}
            onChange={(e) => onUpdate({ region: e.target.value as TripRegion | "all" })}
          >
            <option value="all">All regions</option>
            {facets.regions.map((region) => (
              <option key={region} value={region}>
                {REGION_LABELS[region]}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.filterGroup}>
        <h3>Travel month</h3>
        {facets.months.length > 0 ? (
          <select
            className={styles.selectField}
            aria-label="Filter by confirmed travel month"
            value={filterState.month}
            onChange={(e) => onUpdate({ month: e.target.value })}
          >
            <option value="all">Any month</option>
            {facets.months.map((month) => (
              <option key={month.key} value={month.key}>
                {month.label}
              </option>
            ))}
          </select>
        ) : (
          <p className={styles.groupDesc}>
            No confirmed departure months yet — months will appear here once real dates are published.
          </p>
        )}
      </div>
    </>
  );
}

export default function TripExplorer({ trips }: { trips: Trip[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filterState = useMemo(() => parseFilterState(new URLSearchParams(searchParams.toString())), [searchParams]);
  const facets = useMemo(() => getFacetOptions(trips), [trips]);
  const results = useMemo(() => sortTrips(filterTrips(trips, filterState), filterState.sort), [trips, filterState]);

  const [searchDraft, setSearchDraft] = useState(filterState.q);
  const [syncedQ, setSyncedQ] = useState(filterState.q);
  // Adjusting state during render (React's documented pattern) keeps the input
  // in sync when `q` changes externally — e.g. Back/Forward or an active-chip
  // removal — without the extra render pass an effect would cost.
  if (filterState.q !== syncedQ) {
    setSyncedQ(filterState.q);
    setSearchDraft(filterState.q);
  }

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetTriggerRef = useRef<HTMLButtonElement>(null);

  function updateParams(partial: Partial<TripFilterState>, options: { replace?: boolean } = {}) {
    const next: TripFilterState = { ...filterState, ...partial };
    const params = serializeFilterState(next);
    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (options.replace) router.replace(url, { scroll: false });
    else router.push(url, { scroll: false });
  }

  function onSearchChange(value: string) {
    setSearchDraft(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParams({ q: value }, { replace: true }), 250);
  }

  function closeSheet() {
    setSheetOpen(false);
    sheetTriggerRef.current?.focus();
  }

  useFocusTrap(sheetRef, sheetOpen, closeSheet);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const activeEntries: { key: string; label: string; clear: () => void }[] = [];
  if (filterState.q) activeEntries.push({ key: "q", label: `“${filterState.q}”`, clear: () => updateParams({ q: "" }) });
  if (filterState.category !== "all")
    activeEntries.push({
      key: "category",
      label: CATEGORY_LABELS[filterState.category],
      clear: () => updateParams({ category: "all" }),
    });
  if (filterState.duration !== "all")
    activeEntries.push({
      key: "duration",
      label: DURATION_LABELS[filterState.duration],
      clear: () => updateParams({ duration: "all" }),
    });
  if (filterState.region !== "all")
    activeEntries.push({
      key: "region",
      label: REGION_LABELS[filterState.region],
      clear: () => updateParams({ region: "all" }),
    });
  if (filterState.month !== "all") {
    const month = facets.months.find((m) => m.key === filterState.month);
    activeEntries.push({ key: "month", label: month?.label ?? filterState.month, clear: () => updateParams({ month: "all" }) });
  }

  const hasActiveFilters = activeEntries.length > 0;
  const [featured, ...rest] = results;

  return (
    <>
      <div className={styles.searchOverlap}>
        <div className="container">
          <form
            className={styles.searchPanel}
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              updateParams({ q: searchDraft });
            }}
          >
            <div className={styles.searchField}>
              <label htmlFor="trip-search">Where would you like to go?</label>
              <div className={styles.searchInput}>
                <span className={styles.searchIcon} aria-hidden="true">
                  ⌕
                </span>
                <input
                  id="trip-search"
                  type="search"
                  placeholder={trips.length === 1 ? `Try ${trips[0].destinations[0] ?? trips[0].title}…` : "Search by destination or trip name"}
                  value={searchDraft}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
            <button type="submit" className={styles.searchButton}>
              Find Journeys ↗
            </button>
          </form>
        </div>
      </div>

      <section id="results" className={styles.listing}>
        <div className="container">
          <div className={styles.categories} role="group" aria-label="Filter by category">
            <button
              type="button"
              className={`${styles.chip} ${filterState.category === "all" ? styles.active : ""}`}
              aria-pressed={filterState.category === "all"}
              onClick={() => updateParams({ category: "all" })}
            >
              All Experiences <em>{trips.length}</em>
            </button>
            {CATEGORY_ORDER.filter((c) => facets.categories.includes(c)).map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.chip} ${filterState.category === category ? styles.active : ""}`}
                aria-pressed={filterState.category === category}
                onClick={() => updateParams({ category })}
              >
                {CATEGORY_LABELS[category]}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <div className={styles.activeChips}>
              {activeEntries.map((entry) => (
                <span key={entry.key} className={styles.activeChip}>
                  {entry.label}
                  <button type="button" aria-label={`Remove ${entry.label} filter`} onClick={entry.clear}>
                    ×
                  </button>
                </span>
              ))}
              <button type="button" className={styles.clearAllChip} onClick={() => updateParams(DEFAULT_FILTER_STATE)}>
                Clear all
              </button>
            </div>
          )}

          <div className={styles.catalog}>
            <aside className={styles.filters} aria-label="Refine your trip">
              <div className={styles.filterTitle}>
                <h2>Refine your trip</h2>
                <button type="button" className={styles.clearBtn} onClick={() => updateParams(DEFAULT_FILTER_STATE)}>
                  Clear all
                </button>
              </div>
              <FilterFields idPrefix="desktop" filterState={filterState} facets={facets} onUpdate={updateParams} />
            </aside>

            <div>
              <div className={styles.resultsHead}>
                <div className={styles.resultActions}>
                  <button
                    ref={sheetTriggerRef}
                    type="button"
                    className={styles.mobileFilterTrigger}
                    onClick={() => setSheetOpen(true)}
                    aria-haspopup="dialog"
                  >
                    ☷ Filters
                  </button>
                  <div className={styles.sortWrap}>
                    <label htmlFor="sort-select">Sort by</label>
                    <select
                      id="sort-select"
                      className={styles.sortSelect}
                      value={filterState.sort}
                      onChange={(e) => updateParams({ sort: e.target.value as SortOption })}
                    >
                      {Object.entries(SORT_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {results.length === 0 ? (
                <div className={styles.empty}>
                  <h3>No journeys found.</h3>
                  <p>Try another destination, change the duration or clear the filters.</p>
                  <Button variant="outline" onClick={() => updateParams(DEFAULT_FILTER_STATE)}>
                    Reset filters ↗
                  </Button>
                </div>
              ) : (
                <>
                  {featured && <FeatureTripCard trip={featured} />}
                  {rest.length > 0 && (
                    <div className={styles.tripGrid}>
                      {rest.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className={styles.helpStrip}>
                <div>
                  <h3>Not sure where to start?</h3>
                  <p>Tell us what kind of experience you&apos;re looking for and our team will help you choose.</p>
                </div>
                <Button href="/contact" variant="outline">
                  Message After630 ↗
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {sheetOpen && (
        <div
          className={`${styles.scrim} ${sheetOpen ? styles.show : ""}`}
          onClick={closeSheet}
          aria-hidden="true"
        />
      )}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter journeys"
        className={`${styles.mobileSheet} ${sheetOpen ? styles.show : ""}`}
      >
        <div className={styles.sheetHead}>
          <strong>Filter journeys</strong>
          <button type="button" className={styles.sheetClose} aria-label="Close filters" onClick={closeSheet}>
            ×
          </button>
        </div>
        <div className={styles.sheetScroll}>
          <FilterFields idPrefix="mobile" filterState={filterState} facets={facets} onUpdate={updateParams} />
        </div>
        <div className={styles.sheetFooter}>
          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              updateParams(DEFAULT_FILTER_STATE);
              closeSheet();
            }}
          >
            Clear all
          </button>
          <button type="button" className={styles.apply} onClick={closeSheet}>
            Show {results.length} journeys
          </button>
        </div>
      </div>
    </>
  );
}
