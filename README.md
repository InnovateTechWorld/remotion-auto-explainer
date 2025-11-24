## 🛠️ Deployment

### Cloud Run Deployment (recommended)
Use Cloud Run for managed, scalable hosting. Below are the essential steps and recommended settings.

Prerequisites
- gcloud SDK installed and authenticated (`gcloud auth login`)
- Cloud Run API enabled (`gcloud services enable run.googleapis.com`)
- Docker installed (or use Cloud Build)
- Project set: `gcloud config set project YOUR_PROJECT_ID`

Build and push container
```bash
# Build locally and push to Google Container Registry
PROJECT_ID=your-project-id
IMAGE=gcr.io/$PROJECT_ID/auto-shorts:latest

docker build -t $IMAGE .
docker push $IMAGE
```

Create a service account with S3 (or Google Storage) permissions (optional but recommended)
```bash
gcloud iam service-accounts create auto-shorts-sa --display-name "Auto Shorts SA"
# Grant storage access if using Google Cloud Storage, or attach minimal IAM for your storage provider
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:auto-shorts-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"
```

Deploy to Cloud Run
```bash
SERVICE_NAME=auto-shorts
REGION=us-east1

gcloud run deploy $SERVICE_NAME \
  --image $IMAGE \
  --platform managed \
  --region $REGION \
  --memory 2Gi \
  --concurrency 1 \
  --allow-unauthenticated \
  --timeout 15m \
  --set-env-vars "GEMINI_API_KEY=your_gemini_api_key_here,AWS_REGION=us-east-1,S3_BUCKET_NAME=your-video-bucket-name,AWS_ACCESS_KEY_ID=your_aws_key,AWS_SECRET_ACCESS_KEY=your_aws_secret,NODE_ENV=production,TEMP_DIR=/tmp,PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true,PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome" \
  --service-account auto-shorts-sa@$PROJECT_ID.iam.gserviceaccount.com
```

Notes
- Use at least 2Gi memory for Remotion rendering.
- Set timeout to a higher value (e.g., 15m) because initial renders can be long.
- Concurrency=1 prevents resource contention.
- If using GCS instead of S3, update render.js to use @google-cloud/storage and set appropriate IAM.
- Keep secrets out of source — use Secret Manager or Cloud Run environment variables.

Testing & verification after deployment
1. Get the service URL:
```bash
gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format "value(status.url)"
```
2. Check health endpoint:
```bash
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format "value(status.url)")
curl -s $SERVICE_URL/health
# Expect: {"status":"OK","timestamp":"..."}
```
3. Verify environment variables configured on Cloud Run:
```bash
gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format="json(spec.template.spec.containers[0].env)"
```
4. Start a quick generate request (sanity test):
```bash
curl -X POST "$SERVICE_URL/generate" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test video generation"}'
```
5. Inspect logs for errors:
```bash
gcloud logs read --project $PROJECT_ID --limit 50 --service=$SERVICE_NAME
```

Troubleshooting
- If rendering fails due to Chrome, ensure the Docker image contains google-chrome and set:
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true and PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome
- If uploads fail, verify S3 credentials / bucket policy and network egress settings.
- Use Cloud Run logs to diagnose memory/timeouts and increase memory or timeout if needed.

Deployed on: Cloud Run
