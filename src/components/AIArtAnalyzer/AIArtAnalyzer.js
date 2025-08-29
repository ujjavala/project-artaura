import React, { useState, useEffect } from 'react';
import './AIArtAnalyzer.css';

const AIArtAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Mock AI analysis data
  const mockAnalysisResults = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?w=400&h=300&fit=crop',
      analysis: {
        primaryStyle: 'Contemporary Aboriginal Dot Painting',
        culturalInfluences: ['Dreamtime Stories', 'Western Desert Art', 'Contemporary Urban Expression'],
        techniques: ['Traditional Ochre Pigments', 'Dot Work', 'Symbolic Storytelling'],
        confidence: 94,
        culturalSensitivity: {
          score: 98,
          notes: 'Respectful use of traditional techniques with contemporary expression'
        },
        socialImpact: {
          communityEngagement: 87,
          culturalBridgeBuilding: 92,
          educationalValue: 89
        },
        recommendations: [
          'Consider collaboration with local Aboriginal elders for cultural validation',
          'Excellent for community centers and educational spaces',
          'Would pair well with digital storytelling elements'
        ],
        similarArtists: ['Kathleen Petyarre', 'Emily Kame Kngwarreye', 'Clifford Possum'],
        historicalContext: 'This style connects to 65,000+ years of Aboriginal artistic tradition while embracing contemporary urban narratives'
      }
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop',
      analysis: {
        primaryStyle: 'Pacific Islander Contemporary Sculpture',
        culturalInfluences: ['Polynesian Carving', 'Ocean Spirituality', 'Modern Environmental Art'],
        techniques: ['Traditional Wood Carving', 'Natural Material Integration', 'Totemic Symbolism'],
        confidence: 91,
        culturalSensitivity: {
          score: 96,
          notes: 'Authentic representation of Pacific Islander maritime connection'
        },
        socialImpact: {
          communityEngagement: 83,
          culturalBridgeBuilding: 94,
          educationalValue: 88
        },
        recommendations: [
          'Perfect for coastal infrastructure projects',
          'Consider weather-resistant materials for outdoor installation',
          'Include QR codes for cultural education stories'
        ],
        similarArtists: ['Michel Tuffery', 'Fatu Feu\'u', 'John Pule'],
        historicalContext: 'Reflects Pacific Islander navigation traditions and deep ocean spiritual connections'
      }
    }
  ];

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        simulateAIAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const simulateAIAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResults(null);
    
    // Simulate AI processing time with realistic delays
    setTimeout(() => {
      const randomResult = mockAnalysisResults[Math.floor(Math.random() * mockAnalysisResults.length)];
      setAnalysisResults(randomResult.analysis);
      setIsAnalyzing(false);
    }, 3500); // 3.5 seconds to simulate real AI processing
  };

  const tryExampleImage = (exampleData) => {
    setSelectedImage(exampleData.image);
    simulateAIAnalysis();
  };

  return (
    <div className="ai-analyzer">
      <div className="analyzer-header">
        <h2>🤖 AI Art Style Analyzer</h2>
        <p>Upload your artwork and get AI-powered insights on style, cultural significance, and community impact potential</p>
      </div>

      <div className="upload-section">
        <div 
          className={`upload-zone ${dragActive ? 'drag-active' : ''} ${selectedImage ? 'has-image' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {selectedImage ? (
            <div className="uploaded-image">
              <img src={selectedImage} alt="Uploaded artwork" />
              <div className="image-overlay">
                <button 
                  className="change-image-btn"
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  Change Image
                </button>
              </div>
            </div>
          ) : (
            <div className="upload-prompt">
              <div className="upload-icon">🎨</div>
              <h3>Drop your artwork here or click to upload</h3>
              <p>Supports JPEG, PNG, WebP images up to 10MB</p>
              <button 
                className="upload-btn"
                onClick={() => document.getElementById('fileInput').click()}
              >
                Choose File
              </button>
            </div>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </div>

        <div className="example-images">
          <h4>Try these examples:</h4>
          <div className="examples-grid">
            {mockAnalysisResults.map((example) => (
              <button
                key={example.id}
                className="example-btn"
                onClick={() => tryExampleImage(example)}
              >
                <img src={example.image} alt="Example artwork" />
                <span>{example.analysis.primaryStyle}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isAnalyzing && (
        <div className="analysis-loading">
          <div className="loading-animation">
            <div className="ai-brain">🧠</div>
            <div className="loading-steps">
              <div className="step active">Analyzing visual elements...</div>
              <div className="step active">Identifying cultural patterns...</div>
              <div className="step active">Assessing social impact potential...</div>
              <div className="step">Generating recommendations...</div>
            </div>
          </div>
          <p>AI is analyzing your artwork using advanced computer vision and cultural pattern recognition...</p>
        </div>
      )}

      {analysisResults && !isAnalyzing && (
        <div className="analysis-results">
          <div className="results-header">
            <h3>🎯 AI Analysis Complete</h3>
            <div className="confidence-badge">
              {analysisResults.confidence}% Confidence
            </div>
          </div>

          <div className="results-grid">
            <div className="result-card primary-style">
              <h4>🎨 Primary Art Style</h4>
              <div className="style-name">{analysisResults.primaryStyle}</div>
              <div className="cultural-context">
                <strong>Historical Context:</strong>
                <p>{analysisResults.historicalContext}</p>
              </div>
            </div>

            <div className="result-card cultural-influences">
              <h4>🌍 Cultural Influences Detected</h4>
              <div className="influences-list">
                {analysisResults.culturalInfluences.map((influence, index) => (
                  <span key={index} className="influence-tag">{influence}</span>
                ))}
              </div>
            </div>

            <div className="result-card techniques">
              <h4>🔧 Artistic Techniques</h4>
              <div className="techniques-list">
                {analysisResults.techniques.map((technique, index) => (
                  <span key={index} className="technique-tag">{technique}</span>
                ))}
              </div>
            </div>

            <div className="result-card sensitivity-score">
              <h4>✅ Cultural Sensitivity Assessment</h4>
              <div className="sensitivity-meter">
                <div className="meter-bar">
                  <div 
                    className="meter-fill"
                    style={{ width: `${analysisResults.culturalSensitivity.score}%` }}
                  ></div>
                </div>
                <span className="score">{analysisResults.culturalSensitivity.score}/100</span>
              </div>
              <p className="sensitivity-notes">{analysisResults.culturalSensitivity.notes}</p>
            </div>

            <div className="result-card social-impact">
              <h4>📊 Predicted Social Impact</h4>
              <div className="impact-metrics">
                <div className="metric">
                  <span className="metric-label">Community Engagement</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill engagement"
                      style={{ width: `${analysisResults.socialImpact.communityEngagement}%` }}
                    ></div>
                  </div>
                  <span className="metric-value">{analysisResults.socialImpact.communityEngagement}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Cultural Bridge-Building</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill bridge"
                      style={{ width: `${analysisResults.socialImpact.culturalBridgeBuilding}%` }}
                    ></div>
                  </div>
                  <span className="metric-value">{analysisResults.socialImpact.culturalBridgeBuilding}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Educational Value</span>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill education"
                      style={{ width: `${analysisResults.socialImpact.educationalValue}%` }}
                    ></div>
                  </div>
                  <span className="metric-value">{analysisResults.socialImpact.educationalValue}%</span>
                </div>
              </div>
            </div>

            <div className="result-card recommendations">
              <h4>💡 AI Recommendations</h4>
              <ul className="recommendations-list">
                {analysisResults.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="result-card similar-artists">
              <h4>👥 Similar Artists</h4>
              <p>Your work shares characteristics with these renowned artists:</p>
              <div className="artists-list">
                {analysisResults.similarArtists.map((artist, index) => (
                  <span key={index} className="artist-tag">{artist}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="analysis-actions">
            <button className="btn btn-primary">
              🤝 Find Collaboration Opportunities
            </button>
            <button className="btn btn-secondary">
              📤 Share Analysis Results
            </button>
            <button className="btn btn-secondary">
              🎯 Get Project Recommendations
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIArtAnalyzer;