/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
Config.setDelayRenderTimeoutInMilliseconds(300000); // 5 minutes for Lambda rendering
Config.setConcurrency(1); // Reduce concurrency for Lambda memory optimization