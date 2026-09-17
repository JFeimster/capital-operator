/**
 * Bundle Analyzer Helper Config
 * Capital Operator
 */

import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';

export function getBundleVisualizerPlugin(): PluginOption {
  if (process.env.ANALYZE === 'true') {
    return visualizer({
      filename: './dist/bundle-stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }) as PluginOption;
  }
  return null;
}
