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

### Generate Video

**Endpoint**: `POST /generate`

**Request Body**:
```json
{
  "prompt": "explain quantum physics basics"
}
```

**Response**: Direct video file download (.mp4)

**Example**:
```bash
curl -X POST https://your-app.onrender.com/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "explain photosynthesis process"}' \
  --output educational_video.mp4
```

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

### Render Deployment

1. **Connect Repository**: Link your GitHub repo to Render

2. **Service Configuration**:
   - **Runtime**: Docker
   - **Dockerfile Path**: `./Dockerfile`
   - **Port**: `10000`

3. **Environment Variables**:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   NODE_ENV=production
   TEMP_DIR=/tmp
   ```

4. **Build & Deploy**: Render will automatically build and deploy

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

1. **Script Generation**: AI creates 4-scene educational script
2. **Image Creation**: Gemini generates modern 3D diagrams for each scene
3. **Audio Synthesis**: Text-to-speech creates synchronized narration
4. **Video Rendering**: Remotion combines everything into final MP4
5. **File Delivery**: Video returned directly for download

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
