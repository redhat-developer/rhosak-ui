const REACT_QUERY_DEVTOOLS = "mas.devtools";
const METRICS_LAG_ALERT = "mas.rhosak.metrics.lag-alert-closed";

export function isDevToolsEnabled() {
  return localStorage.getItem(REACT_QUERY_DEVTOOLS) === "true";
}

export function metricsIsLagAlertsDismissed() {
  return localStorage.getItem(METRICS_LAG_ALERT) === "true";
}

export function metricsDismissLagAlerts() {
  return localStorage.setItem(METRICS_LAG_ALERT, "true");
}
