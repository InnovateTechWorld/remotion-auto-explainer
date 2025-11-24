# Educational Video Generator API

A cloud-deployable API service that generates educational explainer videos using AI. Creates professional 2-minute videos with synchronized audio narration, modern 3D visuals, and smooth transitions.

## 🚀 Features

- **AI-Powered Content Generation**: Uses Gemini AI for script writing and image creation
- **Professional Video Production**: Remotion-powered rendering with smooth transitions
- **Modern 3D Visuals**: Stunning educational diagrams with depth and lighting effects
- **Cloud-Optimized**: Memory-efficient for scalable cloud deployment
- **Direct File Download**: Returns video files directly for instant download
- **Educational Focus**: Perfect for creating explainer videos for complex topics

## 📋 API Usage

### Generate Video (Async)

**Endpoint**: `POST /generate`

**Request Body**:
```json
{
  "prompt": "explain quantum physics basics"
}
```

**Response**:
```json
{
  "status": "queued",
  "message": "Video generation started. Check status using the job ID.",
  "jobId": "job_1732432283123_abc123def"
}
```

### Check Job Status

**Endpoint**: `GET /status/:jobId`

**Response** (when processing):
```json
{
  "status": "processing",
  "message": "Generating video...",
  "createdAt": 1732432283123
}
```

**Response** (when completed):
```json
{
  "status": "completed",
  "message": "Video generated successfully!",
  "downloadUrl": "https://your-bucket.s3.amazonaws.com/videos/job_1732432283123_abc123def.mp4",
  "createdAt": 1732432283123
}
```

**Example**:
```bash
# Start video generation
curl -X POST https://your-app.onrender.com/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "explain photosynthesis process"}'

# Check status (replace JOB_ID with actual job ID)
curl https://your-app.onrender.com/status/JOB_ID

# Download video when ready
curl -O https://your-bucket.s3.amazonaws.com/videos/JOB_ID.mp4
```

### Web Interface

Visit `https://your-app.onrender.com` to use the web interface:
- Enter your educational topic in the text area
- Click "Generate Video" to start the process
- The page will show progress updates every 3 seconds
- When ready, a download link will appear for the video
- Generation takes 2-3 minutes

### Health Check

**Endpoint**: `GET /health`

**Response**:
```json
{
  "status": "OK",
  "timestamp": "2025-11-22T19:56:44.618Z"
}
```

## 🛠️ Deployment

### Prerequisites: S3 Bucket Setup

Before deploying, you need to create an S3 bucket for video storage:

1. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://your-video-bucket-name --region us-east-1
   ```

2. **Enable Public Read Access**:
   ```bash
   aws s3api put-bucket-policy --bucket your-video-bucket-name --policy '{
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "PublicReadGetObject",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::your-video-bucket-name/*"
     }]
   }'
   ```

3. **Create IAM User/Role** with S3 permissions:
   - Attach `AmazonS3FullAccess` policy
   - Note the Access Key ID and Secret Access Key

### Render Deployment

1. **Connect Repository**: Link your GitHub repo to Render

2. **Service Configuration**:
   - **Runtime**: Docker
   - **Dockerfile Path**: `./Dockerfile`
   - **Port**: `10000`

3. **Environment Variables**:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   AWS_REGION=us-east-1
   S3_BUCKET_NAME=your-video-bucket-name
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   NODE_ENV=production
   TEMP_DIR=/tmp
   PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
   PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome
   ```

4. **Instance Type**: Choose at least 2GB RAM for video generation

5. **Build & Deploy**: Render will automatically build and deploy

### Troubleshooting Deployment

- **Build Failures**: Check that all dependencies are properly listed in package.json
- **Memory Issues**: Video generation requires ~2GB RAM minimum
- **Timeout Issues**: First video generation may take up to 5 minutes
- **Chrome Issues**: Remotion requires Chrome for rendering - ensure Docker setup is correct

### Local Development

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your GEMINI_API_KEY

# Run locally
npm run dev

# Test the API
curl -X POST http://localhost:10000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "explain gravity"}'
```

## 🔧 Configuration

### Required Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key for AI content generation
- `AWS_REGION`: AWS region for S3 bucket (e.g., us-east-1)
- `S3_BUCKET_NAME`: Name of your S3 bucket for video storage
- `AWS_ACCESS_KEY_ID`: AWS access key ID for S3 access
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key for S3 access
- `PORT`: Server port (defaults to 10000 for Render)
- `NODE_ENV`: Environment (production for cloud deployment)

### Video Specifications

- **Duration**: ~2 minutes (120 seconds)
- **Resolution**: 1920x1080 (Full HD)
- **Format**: MP4 with H.264 encoding
- **Scenes**: 4 progressive educational scenes
- **Audio**: AI-generated narration synchronized with visuals

## 📊 Architecture

### Components

- **render.js**: Express server with API endpoints
- **generateVideo.js**: Main video generation orchestrator
- **scriptGenerator.js**: AI script and scene creation
- **generateAudio.js**: Text-to-speech audio generation
- **MyVideo.tsx**: Remotion video composition

### Workflow

1. **Job Queuing**: API receives prompt and returns job ID immediately
2. **Script Generation**: AI creates 4-scene educational script
3. **Image Creation**: Gemini generates modern 3D diagrams for each scene
4. **Audio Synthesis**: Text-to-speech creates synchronized narration
5. **Video Rendering**: Remotion combines everything into final MP4
6. **Cloud Storage**: Completed video uploaded to S3 with public access
7. **Status Updates**: Frontend polls for completion and shows download link

## 🎯 Video Features

- **Progressive Learning**: Each scene builds on previous knowledge
- **Visual Synchronization**: Narration directly references on-screen diagrams
- **Modern Aesthetics**: 3D rendered graphics with professional styling
- **Educational Focus**: 85% visual learning with explanatory narration
- **Brand Consistency**: Clean white backgrounds with purple/blue accents

## 🔍 Troubleshooting

### Common Issues

**Video Generation Fails**
- Check `GEMINI_API_KEY` is set correctly
- Ensure sufficient API quota
- Verify network connectivity

**Memory Issues**
- Service uses temp directories for processing
- Files are cleaned up after generation
- Monitor Render logs for memory usage

**Slow Generation**
- Video generation takes 2-3 minutes per request
- Consider implementing queuing for high traffic
- Monitor API rate limits

## 📈 Performance

- **Generation Time**: 2-3 minutes per video
- **File Size**: ~50-100MB per video
- **Memory Usage**: Optimized for cloud deployment
- **Concurrent Requests**: 1-2 simultaneous generations recommended

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues or questions:
- Check the troubleshooting section above
- Review Render deployment logs
- Ensure all environment variables are set
- Test with simple prompts first

---

**Built with**: Node.js, Express, Remotion, Google Gemini AI
**Deployed on**: Render
**Video Engine**: Remotion with custom React components
