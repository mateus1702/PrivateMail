/**
 * Sponsor SDK types. Framework-agnostic, reusable by dApps.
 */

/** Optional referral context for pm_sponsorUserOperation (0-500 bps). */
export interface ReferralContext {
  referralAddress: string;
  referralBps: number;
}

/** Paymaster sponsorship fields for eth_sendUserOperation. */
export interface PaymasterSponsorship {
  paymaster: string;
  paymasterData: string;
  paymasterVerificationGasLimit: string;
  paymasterPostOpGasLimit: string;
}

/** Quote fields returned by pm_sponsorUserOperation (no synthetic ceiling). */
export interface SponsorApiQuote {
  estimatedBaseCostUsdcE6: string;
  estimatedReferralUsdcE6: string;
  estimatedTotalCostUsdcE6: string;
  estimatedNormalGasUnits: string;
  estimatedDeployGasUnits: string;
  minUsdcReserveNormalE6: string;
  minUsdcReserveDeployE6: string;
  estimatedGas: string;
  approximateBaseCostUsdcE6: string;
  approximateReferralUsdcE6: string;
  approximateTotalCostUsdcE6: string;
  approximateGasUnits: string;
  /** Unix epoch seconds - quote valid until this time (for TTL check). */
  validUntil: string;
}

/** App quote: API fields plus computed max for modal and approve sizing. */
export interface SponsorQuote extends SponsorApiQuote {
  maxTotalCostUsdcE6: string;
}

/** Raw sponsor RPC result (sponsorship + API quote). */
export interface SponsorResult extends PaymasterSponsorship, SponsorApiQuote {}

/** Client configuration. */
export interface SponsorClientConfig {
  paymasterUrl: string;
  entryPointAddress: string;
  referralContext?: ReferralContext;
  /** Optional custom fetch (for SSR/testing). */
  fetchFn?: typeof fetch;
  /** Request timeout in ms (default 10000). */
  timeoutMs?: number;
  /** Seconds before validUntil when quote is considered stale (default 30). */
  quoteExpiryBufferSec?: number;
}

/** Request for sponsor call. */
export interface SponsorRequest {
  userOp: Record<string, unknown>;
  referralContext?: ReferralContext;
}
