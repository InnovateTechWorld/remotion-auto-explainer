# Remotion Auto Explainer

AI-powered video generation platform for turning a simple prompt into a polished, branded explainer video using Remotion, Gemini, and cloud-native rendering.

## Overview

Remotion Auto Explainer is a full-stack workflow for generating short-form product, concept, or process explainers automatically. A user submits a prompt to the API, the app generates a structured scene-by-scene script, composes a video in Remotion, and then publishes the rendered output to cloud storage for download or embedding.

The project is designed for:
- Product and feature explainers
- Internal engineering demos
- Marketing and training video generation
- Quick AI-assisted storytelling for short-form content

## Project name and positioning

The project is branded as: Remotion Auto Explainer

This reflects the core idea: an automatic explainer-video pipeline powered by AI and rendered through Remotion.

## Core capabilities

- AI script generation from a natural-language prompt
- Structured scenes and narration flow for animated explainers
- Remotion-based rendering pipeline for visual storytelling
- Cloud-ready deployment for serverless or containerized hosting
- S3-backed video delivery with job tracking and status API
- Health checks and async generation workflow for production use

## Architecture

The application combines a lightweight Express API with a render engine and AI generation pipeline:

- API layer: Express server exposed on a configurable port
- Script generation: AI-powered content planning from input prompt
- Video generation: Remotion render jobs assembled from generated scenes
- Storage: AWS S3 for final output uploads
- Deployment: Cloud Run with optional Remotion Lambda for distributed rendering

## Tech stack

- Frontend/rendering: Remotion, React, Framer Motion
- Backend: Node.js, Express
- AI: Google Generative AI (Gemini)
- Cloud: Google Cloud Run, AWS S3, optional AWS Lambda
- Build tooling: TypeScript, ESLint, Prettier

## Repository structure

```text
.
├── components/
│   ├── generateVideo.js
│   └── scriptGenerator.js
├── public/
│   └── pages/
├── src/
│   ├── Root.tsx
│   ├── MyVideo.tsx
│   └── ...
├── render.js
├── package.json
├── README.md
├── .env.example
└── Dockerfile
```

## Quick start

### Prerequisites

- Node.js 18+
- npm or yarn
- Access to a Gemini API key
- AWS credentials for S3 output (unless using a different storage backend)

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root with values similar to:

```bash
PORT=10000
GEMINI_API_KEY=your_gemini_api_key_here
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-video-bucket-name
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
NODE_ENV=development
```

### Run locally

```bash
npm run dev
```

The app starts an Express server and serves the generated video workflow locally.

## API usage

### Health check

```bash
curl http://localhost:10000/health
```

Expected response:

```json
{ "status": "OK", "timestamp": "2026-09-23T00:00:00.000Z" }
```

### Generate a video job

```bash
curl -X POST "http://localhost:10000/generate" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Create a 30 second explainer for a SaaS workflow automation platform"}'
```

Response:

```json
{
  "status": "queued",
  "message": "Video generation started. Check status using the job ID.",
  "jobId": "job_1234567890_abc123xyz"
}
```

### Check job status

```bash
curl http://localhost:10000/status/job_1234567890_abc123xyz
```

## Deployment

### Cloud Run deployment (recommended)

The project is designed to run as a containerized service on Google Cloud Run. This is a strong fit for asynchronous AI/video workloads where rendering may take longer than standard request timeouts.

#### Prerequisites

- Google Cloud SDK installed and authenticated
- Cloud Run API enabled
- Docker installed
- GCP project configured

#### Build and push the image

```bash
PROJECT_ID=your-project-id
IMAGE=gcr.io/$PROJECT_ID/remotion-auto-explainer:latest

docker build -t $IMAGE .
docker push $IMAGE
```

#### Deploy to Cloud Run

```bash
SERVICE_NAME=remotion-auto-explainer
REGION=us-east1

gcloud run deploy $SERVICE_NAME \
  --image $IMAGE \
  --platform managed \
  --region $REGION \
  --memory 2Gi \
  --concurrency 1 \
  --allow-unauthenticated \
  --timeout 15m \
  --set-env-vars "GEMINI_API_KEY=your_gemini_api_key_here,AWS_REGION=us-east-1,S3_BUCKET_NAME=your-video-bucket-name,AWS_ACCESS_KEY_ID=your_aws_key,AWS_SECRET_ACCESS_KEY=your_aws_secret,NODE_ENV=production" \
  --service-account remotion-auto-explainer-sa@$PROJECT_ID.iam.gserviceaccount.com
```

### Remotion Lambda (alternative)

For better rendering performance and scale, the same workflow can be paired with Remotion Lambda for media processing. This reduces local Chrome/rendering overhead and can improve throughput for higher-volume workloads.

## Production considerations

- Keep secrets in environment variables or Secret Manager, not in source control
- Use a managed object storage bucket for generated media
- Tune concurrency and timeouts based on video length and render complexity
- Add Redis or a durable job store if this service moves beyond in-memory tracking
- Set up monitoring and logs for AI quota, render failures, and storage bottlenecks

## Development notes

Useful project commands:

```bash
npm run start
npm run dev
npm run build
npm run render
npm run lint
```

## Example use cases

- "Create a 30-second explainer for a healthcare appointment booking workflow"
- "Generate a product demo for a new AI analytics dashboard"
- "Build a training video explaining the lifecycle of a deployment pipeline"
- "Turn a feature brief into a short animated company story"

## Roadmap

Planned improvements include:
- Persistent job storage with Redis/Postgres
- User authentication and project-level configuration
- Better scene templates and branding controls
- Support for subtitles, voiceovers, and multiple aspect ratios
- Analytics for render time, cost, and output quality

## License

This project is currently configured as private/unlicensed for internal or experimental use. Update licensing before production deployment or open-source release.

## Summary

Remotion Auto Explainer turns ideas into video content using AI-driven scripting and cloud-native rendering. It is built for teams that need fast, repeatable, scalable explainer-video generation without manual production bottlenecks.

This README is intended to reflect the real purpose of the project: an AI-powered explainer generator and render pipeline, not simply a deployment script.
