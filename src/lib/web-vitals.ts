type WebVitalMetric = {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
};

function getRating(name: string, value: number): WebVitalMetric['rating'] {
  const thresholds: Record<string, [number, number]> = {
    LCP: [2500, 4000],
    FID: [100, 300],
    CLS: [0.1, 0.25],
    FCP: [1800, 3000],
    TTFB: [800, 1800],
  };

  const [good, poor] = thresholds[name] || [Infinity, Infinity];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

function reportMetric(metric: WebVitalMetric) {
  if (import.meta.env.DEV) {
    const colors = { good: '#0CCE6B', 'needs-improvement': '#FFA400', poor: '#FF4E42' };
    console.log(
      `%c[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
      `color: ${colors[metric.rating]}; font-weight: bold;`
    );
  }
}

function observeLCP() {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        reportMetric({
          name: 'LCP',
          value: lastEntry.startTime,
          rating: getRating('LCP', lastEntry.startTime),
        });
      }
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (_) { /* not supported */ }
}

function observeFID() {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEventTiming;
        const fid = fidEntry.processingStart - fidEntry.startTime;
        reportMetric({
          name: 'FID',
          value: fid,
          rating: getRating('FID', fid),
        });
      }
    });
    observer.observe({ type: 'first-input', buffered: true });
  } catch (_) { /* not supported */ }
}

function observeCLS() {
  try {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
        }
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportMetric({
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue),
        });
      }
    });
  } catch (_) { /* not supported */ }
}

function observeFCP() {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          reportMetric({
            name: 'FCP',
            value: entry.startTime,
            rating: getRating('FCP', entry.startTime),
          });
        }
      }
    });
    observer.observe({ type: 'paint', buffered: true });
  } catch (_) { /* not supported */ }
}

export function reportWebVitals() {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return;

  observeLCP();
  observeFID();
  observeCLS();
  observeFCP();
}
