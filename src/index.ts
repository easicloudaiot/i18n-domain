/**
 * @easicloudaiot/i18n-domain
 *
 * Single source of truth for canonical domain vocabulary across platforms.
 * Contains ONLY shared terms (entity types, hierarchy labels, permission
 * levels, status enums) — not UI-specific copy.
 *
 * - Web: imported by centralizers and registered into i18next.
 * - Flutter (future): JSON can be consumed directly or transformed into ARB.
 *
 * Format constraints (so this stays cross-platform):
 * - No interpolation placeholders. Variable substitution is the host i18n
 *   system's job.
 * - No plural rules (use explicit singular/plural fields). Locale-specific
 *   plural forms beyond one/other belong in the host i18n system.
 * - Strings are leaves of a fixed shape — the TypeScript type below
 *   enforces structural parity across languages.
 */

import en from "../locales/en.json" with { type: "json" };
import fr from "../locales/fr.json" with { type: "json" };

export type HierarchyLevelKey =
  | "easicloud"
  | "company"
  | "building"
  | "floor"
  | "zone";

export type EntityKey = "asset" | "device" | "user" | "owner";

export type PermissionKey = "none" | "read" | "write" | "manage";

export type CustodyKey =
  | "NEEDS_PROVISIONING"
  | "AWAITING_TELEMETRY"
  | "AT_HOME"
  | "LOANED_OUT"
  | "IN_TRANSIT"
  | "MISSING"
  | "MAINTENANCE";

export type DeviceStatusKey =
  | "ACTIVE"
  | "INACTIVE"
  | "MAINTENANCE"
  | "DECOMMISSIONED";

export type DeviceTypeKey = "TRACKER" | "REPEATER";

export type RoleKey = "GLOBAL_ADMIN" | "CUSTOMER_ADMIN" | "USER";

export type BuildingTypeKey =
  | "OFFICE"
  | "WAREHOUSE"
  | "FACTORY"
  | "RETAIL"
  | "MEDICAL"
  | "SCHOOL"
  | "OTHER";

export type IndustryKey =
  | "Technology"
  | "Healthcare"
  | "Finance"
  | "Manufacturing"
  | "Retail"
  | "Education"
  | "Construction"
  | "Transportation"
  | "Energy"
  | "Other";

export type TimeBucketKey =
  | "LAST_DAY"
  | "LAST_7_DAYS"
  | "LAST_30_DAYS"
  | "LAST_3_MONTHS"
  | "LAST_YEAR";

export type SeverityKey = "critical" | "warning" | "info" | "resolved";

export interface NounLabel {
  singular: string;
  plural: string;
}

export interface DomainStrings {
  hierarchy: Record<HierarchyLevelKey, NounLabel>;
  entity: Record<EntityKey, NounLabel>;
  permission: Record<PermissionKey, string>;
  custody: Record<CustodyKey, string>;
  deviceStatus: Record<DeviceStatusKey, string>;
  deviceType: Record<DeviceTypeKey, string>;
  role: Record<RoleKey, string>;
  buildingType: Record<BuildingTypeKey, string>;
  industry: Record<IndustryKey, string>;
  timeBucket: Record<TimeBucketKey, string>;
  severity: Record<SeverityKey, string>;
}

export const SUPPORTED_LANGUAGES = ["en", "fr"] as const;
export type DomainLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const TABLES: Record<DomainLanguage, DomainStrings> = {
  en: en as DomainStrings,
  fr: fr as DomainStrings,
};

/**
 * Get the full domain string table for a language. Falls back to EN for
 * unknown languages so callers never crash on a missing locale.
 */
export function getDomainStrings(lang: string): DomainStrings {
  return TABLES[lang as DomainLanguage] ?? TABLES.en;
}

/**
 * Map-style accessor — convenient when only one label is needed.
 *
 * @example
 *   hierarchyLabel("en", "company", "plural") // "Clients"
 */
export function hierarchyLabel(
  lang: string,
  key: HierarchyLevelKey,
  form: keyof NounLabel = "singular",
): string {
  return getDomainStrings(lang).hierarchy[key][form];
}

export function entityLabel(
  lang: string,
  key: EntityKey,
  form: keyof NounLabel = "singular",
): string {
  return getDomainStrings(lang).entity[key][form];
}

export function permissionLabel(lang: string, key: PermissionKey): string {
  return getDomainStrings(lang).permission[key];
}

export function custodyLabel(lang: string, key: CustodyKey): string {
  return getDomainStrings(lang).custody[key];
}

export function deviceStatusLabel(lang: string, key: DeviceStatusKey): string {
  return getDomainStrings(lang).deviceStatus[key];
}

export function deviceTypeLabel(lang: string, key: DeviceTypeKey): string {
  return getDomainStrings(lang).deviceType[key];
}

export function roleLabel(lang: string, key: RoleKey): string {
  return getDomainStrings(lang).role[key];
}

export function buildingTypeLabel(lang: string, key: BuildingTypeKey): string {
  return getDomainStrings(lang).buildingType[key];
}

export function industryLabel(lang: string, key: IndustryKey): string {
  return getDomainStrings(lang).industry[key];
}

export function timeBucketLabel(lang: string, key: TimeBucketKey): string {
  return getDomainStrings(lang).timeBucket[key];
}

export function severityLabel(lang: string, key: SeverityKey): string {
  return getDomainStrings(lang).severity[key];
}

export { en as enDomainStrings, fr as frDomainStrings };
