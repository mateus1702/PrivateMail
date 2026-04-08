/**
 * Build app-facing sponsor quote (UI + approve ceiling) from pm_sponsorUserOperation result.
 */

import type { SponsorApiQuote, SponsorQuote, SponsorResult } from "./types";

/** USDC ceiling for display and ERC-20 approve: max of estimate and paymaster min reserves. */
export function maxTotalCostUsdcE6FromApiQuote(q: SponsorApiQuote): string {
  const values = [
    BigInt(q.estimatedTotalCostUsdcE6),
    BigInt(q.minUsdcReserveNormalE6),
    BigInt(q.minUsdcReserveDeployE6),
  ];
  const m = values.reduce((a, b) => (a > b ? a : b));
  return m.toString();
}

export function toAppSponsorQuote(result: SponsorResult): SponsorQuote {
  const api: SponsorApiQuote = {
    estimatedBaseCostUsdcE6: result.estimatedBaseCostUsdcE6,
    estimatedReferralUsdcE6: result.estimatedReferralUsdcE6,
    estimatedTotalCostUsdcE6: result.estimatedTotalCostUsdcE6,
    estimatedNormalGasUnits: result.estimatedNormalGasUnits,
    estimatedDeployGasUnits: result.estimatedDeployGasUnits,
    minUsdcReserveNormalE6: result.minUsdcReserveNormalE6,
    minUsdcReserveDeployE6: result.minUsdcReserveDeployE6,
    estimatedGas: result.estimatedGas,
    approximateBaseCostUsdcE6: result.approximateBaseCostUsdcE6,
    approximateReferralUsdcE6: result.approximateReferralUsdcE6,
    approximateTotalCostUsdcE6: result.approximateTotalCostUsdcE6,
    approximateGasUnits: result.approximateGasUnits,
    validUntil: result.validUntil,
  };
  return {
    ...api,
    maxTotalCostUsdcE6: maxTotalCostUsdcE6FromApiQuote(api),
  };
}
