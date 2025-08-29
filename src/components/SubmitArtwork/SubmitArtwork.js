import React, { useState, useEffect } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import Navigation from '../Navigation/Navigation';
import absDataService from '../../services/absDataService';
import './SubmitArtwork.css';

const SubmitArtwork = ({ user }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    statement: '',
    artistName: user?.name || user?.username || '',
    email: user?.email || '',
    communityConnection: '',
    // Artist type and inclusive categories
    artistType: '',
    artStyle: '',
    lgbtqiaInclusive: false,
    // School field trip booking
    isSchoolFieldTrip: false,
    schoolName: '',
    teacherName: '',
    studentCount: '',
    ageGroup: '',
    visitDate: '',
    paintingActivity: false,
    // Employment and workforce diversity
    providesEmployment: false,
    estimatedJobs: '',
    femaleArtists: false,
    disabilityInclusive: false,
    indigenousArtists: false,
    payEquity: false,
    // ABS-informed fields
    educationLevel: '',
    currentlyStudying: false,
    employmentStatus: '',
    skillLevel: '',
    apprenticeshipExperience: false
  });
  const [absData, setAbsData] = useState(null);

  const mockProjects = [
    {
      id: 1,
      title: 'Western Sydney Metro',
      location: 'Parramatta to Sydney CBD',
      status: 'Active',
      phase: 'Art Collection',
      artworks: 12,
      deadline: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=300&h=200&fit=crop&crop=center'
    },
    {
      id: 2,
      title: 'Pacific Highway Upgrade',
      location: 'Northern Beaches',
      status: 'Planning',
      phase: 'Community Engagement',
      artworks: 0,
      deadline: '2024-04-20',
      image: 'https://images.unsplash.com/photo-1460472354-b33ff0c44a43?w=300&h=200&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'Light Rail Extension',
      location: 'Inner West',
      status: 'Active',
      phase: 'Installation',
      artworks: 8,
      deadline: '2024-02-28',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop&crop=center'
    }
  ];

  useEffect(() => {
    const data = absDataService.getStaticABSData();
    setAbsData(data);
  }, []);

  const handleImageUpload = (newImages) => {
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const handleImageRemove = (removedImage, remainingImages) => {
    setUploadedImages(remainingImages);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      images: uploadedImages,
      submittedAt: new Date().toISOString()
    };
    console.log('Submission data:', submissionData);
    alert('Artwork submitted successfully! You will receive a confirmation email shortly.');
  };

  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      images: uploadedImages,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('artworkDraft', JSON.stringify(draftData));
    alert('Draft saved successfully!');
  };

  return (
    <>
      <Navigation />
      <div className="submit-artwork">
        <div className="submit-artwork-container">
        <div className="submit-header">
          <h1>Submit Your Artwork to Artaura</h1>
          <p>Art Beyond Barriers - Share your creative vision to transform construction sites into inspiring community spaces.</p>
        </div>
        
        <form className="submit-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Project Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="projectId">Project Selection</label>
                <select 
                  id="projectId"
                  name="projectId"
                  className="form-control"
                  value={formData.projectId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a project...</option>
                  {mockProjects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.title} - {project.location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="title">Artwork Title</label>
                <input 
                  type="text"
                  id="title" 
                  name="title"
                  className="form-control" 
                  placeholder="Give your artwork a meaningful title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="statement">Artist Statement</label>
              <textarea 
                id="statement"
                name="statement"
                className="form-control" 
                rows="4"
                placeholder="Describe your artwork, its inspiration, and how it represents community inclusion..."
                value={formData.statement}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h3>Upload Your Artwork</h3>
            <ImageUpload 
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
            />
          </div>

          <div className="form-section">
            <h3>Artist Information & Inclusivity</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="artistName">Artist/Organization Name</label>
                <input 
                  type="text"
                  id="artistName"
                  name="artistName"
                  className="form-control" 
                  placeholder="Your name or organization"
                  value={formData.artistName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Contact Email</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  className="form-control" 
                  placeholder="Contact email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="artistType">Artist Type</label>
                <select 
                  id="artistType"
                  name="artistType"
                  className="form-control"
                  value={formData.artistType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select artist type...</option>
                  <option value="local-community">Local Community Artist</option>
                  <option value="street-graffiti">Street/Graffiti Artist</option>
                  <option value="traditional-indigenous">Traditional Indigenous Artist</option>
                  <option value="contemporary-multicultural">Contemporary Multicultural Artist</option>
                  <option value="lgbtqia-advocate">LGBTQIA+ Advocate Artist</option>
                  <option value="faith-community">Faith Community Artist</option>
                  <option value="school-educator">School Art Educator</option>
                  <option value="professional">Professional Artist</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="artStyle">Art Style</label>
                <select 
                  id="artStyle"
                  name="artStyle"
                  className="form-control"
                  value={formData.artStyle}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select art style...</option>
                  <option value="street-art">Street Art/Graffiti</option>
                  <option value="aboriginal-traditional">Aboriginal Traditional</option>
                  <option value="rainbow-pride">Rainbow/Pride Art</option>
                  <option value="multicultural-fusion">Multicultural Fusion</option>
                  <option value="kids-friendly">Kids-Friendly Interactive</option>
                  <option value="faith-inspired">Faith-Inspired</option>
                  <option value="contemporary-urban">Contemporary Urban</option>
                  <option value="environmental">Environmental/Nature</option>
                </select>
              </div>
            </div>
            
            <div className="checkbox-grid">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="lgbtqiaInclusive"
                  name="lgbtqiaInclusive"
                  checked={formData.lgbtqiaInclusive}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    lgbtqiaInclusive: e.target.checked
                  }))}
                />
                <label htmlFor="lgbtqiaInclusive">🏳️‍🌈 This artwork celebrates LGBTQIA+ diversity and inclusion</label>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="communityConnection">Community Connection</label>
              <textarea 
                id="communityConnection"
                name="communityConnection"
                className="form-control" 
                rows="3"
                placeholder="How does this artwork connect with the local community or represent diversity and inclusion?"
                value={formData.communityConnection}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="form-section">
            <h3>🎨 School Field Trip & Kids Activities</h3>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="isSchoolFieldTrip"
                name="isSchoolFieldTrip"
                checked={formData.isSchoolFieldTrip}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  isSchoolFieldTrip: e.target.checked
                }))}
              />
              <label htmlFor="isSchoolFieldTrip">📚 Book a school field trip to visit this art site</label>
            </div>
            
            {formData.isSchoolFieldTrip && (
              <div className="school-trip-details">
                <h4>School Visit Details</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="schoolName">School Name</label>
                    <input 
                      type="text"
                      id="schoolName"
                      name="schoolName"
                      className="form-control" 
                      placeholder="Name of the school"
                      value={formData.schoolName}
                      onChange={handleInputChange}
                      required={formData.isSchoolFieldTrip}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="teacherName">Teacher/Coordinator Name</label>
                    <input 
                      type="text"
                      id="teacherName"
                      name="teacherName"
                      className="form-control" 
                      placeholder="Lead teacher name"
                      value={formData.teacherName}
                      onChange={handleInputChange}
                      required={formData.isSchoolFieldTrip}
                    />
                  </div>
                </div>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="studentCount">Number of Students</label>
                    <select 
                      id="studentCount"
                      name="studentCount"
                      className="form-control"
                      value={formData.studentCount}
                      onChange={handleInputChange}
                      required={formData.isSchoolFieldTrip}
                    >
                      <option value="">Select class size...</option>
                      <option value="1-15">1-15 students (Small class)</option>
                      <option value="16-25">16-25 students (Medium class)</option>
                      <option value="26-35">26-35 students (Large class)</option>
                      <option value="36+">36+ students (Multiple classes)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="visitDate">Preferred Visit Date</label>
                    <input 
                      type="date"
                      id="visitDate"
                      name="visitDate"
                      className="form-control" 
                      value={formData.visitDate}
                      onChange={handleInputChange}
                      required={formData.isSchoolFieldTrip}
                    />
                  </div>
                </div>
                
                <div className="checkbox-grid">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="paintingActivity"
                      name="paintingActivity"
                      checked={formData.paintingActivity}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        paintingActivity: e.target.checked
                      }))}
                    />
                    <label htmlFor="paintingActivity">🎨 Include hands-on painting activity for kids</label>
                  </div>
                </div>
                
                <div className="school-activities-info">
                  <h5>🌟 Fun Activities Available:</h5>
                  <ul>
                    <li>🎨 <strong>Painting Workshops:</strong> Kids paint alongside local artists</li>
                    <li>🌈 <strong>Rainbow Art Sessions:</strong> LGBTQIA+ inclusive art creation</li>
                    <li>🖌️ <strong>Street Art Lessons:</strong> Learn from reformed graffiti artists</li>
                    <li>🏛️ <strong>Cultural Stories:</strong> Aboriginal and multicultural art history</li>
                    <li>👥 <strong>Community Meet-ups:</strong> Meet local artists and community members</li>
                    <li>📚 <strong>Educational Tours:</strong> Learn about construction and art integration</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>💼 Employment & Workforce Diversity</h3>
            <p className="section-description">
              <strong>Help us track employment opportunities and workforce diversity.</strong><br/>
              Based on ABS 2024 data: Employment rate is 77.1% (Female: 74.2%, Male: 80.0%). 
              We're committed to bridging gaps and creating inclusive opportunities.
            </p>
            
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="providesEmployment"
                name="providesEmployment"
                checked={formData.providesEmployment}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  providesEmployment: e.target.checked
                }))}
              />
              <label htmlFor="providesEmployment">💼 This artwork project creates employment opportunities</label>
            </div>
            
            {formData.providesEmployment && (
              <div className="employment-details">
                <h4>Employment Impact Details</h4>
                <div className="form-group">
                  <label htmlFor="estimatedJobs">Estimated Number of Jobs Created</label>
                  <select 
                    id="estimatedJobs"
                    name="estimatedJobs"
                    className="form-control"
                    value={formData.estimatedJobs}
                    onChange={handleInputChange}
                    required={formData.providesEmployment}
                  >
                    <option value="">Select job count...</option>
                    <option value="1-2">1-2 jobs (Individual artist project)</option>
                    <option value="3-5">3-5 jobs (Small team project)</option>
                    <option value="6-10">6-10 jobs (Medium collaborative project)</option>
                    <option value="11+">11+ jobs (Large community project)</option>
                  </select>
                </div>
                
                <h5>Workforce Diversity Commitments</h5>
                <div className="diversity-commitments">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="femaleArtists"
                      name="femaleArtists"
                      checked={formData.femaleArtists}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        femaleArtists: e.target.checked
                      }))}
                    />
                    <label htmlFor="femaleArtists">♀️ Prioritizes female artists (Target: 74.2% workforce participation)</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="disabilityInclusive"
                      name="disabilityInclusive"
                      checked={formData.disabilityInclusive}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        disabilityInclusive: e.target.checked
                      }))}
                    />
                    <label htmlFor="disabilityInclusive">♿ Includes people with disability (Current: 56.1% employment rate)</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="indigenousArtists"
                      name="indigenousArtists"
                      checked={formData.indigenousArtists}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        indigenousArtists: e.target.checked
                      }))}
                    />
                    <label htmlFor="indigenousArtists">🪃 Includes Aboriginal & Torres Strait Islander artists (Current: 55.7% employment rate)</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="payEquity"
                      name="payEquity"
                      checked={formData.payEquity}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        payEquity: e.target.checked
                      }))}
                    />
                    <label htmlFor="payEquity">💰 Commits to pay equity (Current gender pay gap: 11.5%)</label>
                  </div>
                </div>
                
                <div className="employment-impact-info">
                  <h5>📊 How This Helps:</h5>
                  <ul>
                    <li><strong>Female Employment:</strong> Women's employment rate has grown +11.4 percentage points over 20 years to 74.2%</li>
                    <li><strong>Disability Inclusion:</strong> Employment rate for people with disability has grown from 47.8% to 56.1%</li>
                    <li><strong>Indigenous Opportunities:</strong> Aboriginal & Torres Strait Islander employment has increased from 51.0% to 55.7%</li>
                    <li><strong>Pay Equity:</strong> Gender pay gap has reduced from 15.2% to 11.5% over 20 years</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>Demographics & Education <small>(Optional - helps us track community impact)</small></h3>
            <p className="section-description">
              This information helps us understand our community reach and aligns with Australian Bureau of Statistics data on education and employment outcomes.
            </p>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="ageGroup">Age Group</label>
                <select 
                  id="ageGroup"
                  name="ageGroup"
                  className="form-control"
                  value={formData.ageGroup}
                  onChange={handleInputChange}
                >
                  <option value="">Select age group</option>
                  <option value="15-24">15-24 years</option>
                  <option value="25-34">25-34 years</option>
                  <option value="35-44">35-44 years</option>
                  <option value="45-54">45-54 years</option>
                  <option value="55-64">55-64 years</option>
                  <option value="65-74">65-74 years</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="educationLevel">Highest Education Level</label>
                <select 
                  id="educationLevel"
                  name="educationLevel"
                  className="form-control"
                  value={formData.educationLevel}
                  onChange={handleInputChange}
                >
                  <option value="">Select education level</option>
                  <option value="year-12">Year 12 or equivalent</option>
                  <option value="certificate-3-4">Certificate III/IV</option>
                  <option value="diploma">Diploma/Advanced Diploma</option>
                  <option value="bachelor">Bachelor Degree</option>
                  <option value="postgrad">Postgraduate Qualification</option>
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="employmentStatus">Employment Status</label>
                <select 
                  id="employmentStatus"
                  name="employmentStatus"
                  className="form-control"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                >
                  <option value="">Select employment status</option>
                  <option value="employed-ft">Employed Full-time</option>
                  <option value="employed-pt">Employed Part-time</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="unemployed">Looking for work</option>
                  <option value="student">Student</option>
                  <option value="retired">Retired</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="skillLevel">Occupation Skill Level</label>
                <select 
                  id="skillLevel"
                  name="skillLevel"
                  className="form-control"
                  value={formData.skillLevel}
                  onChange={handleInputChange}
                >
                  <option value="">Select skill level (if employed)</option>
                  <option value="level-1">Level 1 - Professional/Manager</option>
                  <option value="level-2">Level 2 - Associate Professional</option>
                  <option value="level-3">Level 3 - Skilled/Technician</option>
                  <option value="level-4">Level 4 - Community Service</option>
                  <option value="level-5">Level 5 - Entry Level</option>
                </select>
              </div>
            </div>

            <div className="checkbox-grid">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="currentlyStudying"
                  name="currentlyStudying"
                  checked={formData.currentlyStudying}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    currentlyStudying: e.target.checked
                  }))}
                />
                <label htmlFor="currentlyStudying">Currently studying ({absData?.demographics.qualifications.currentlyStudying}% of Australians are)</label>
              </div>
              
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="apprenticeshipExperience"
                  name="apprenticeshipExperience"
                  checked={formData.apprenticeshipExperience}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    apprenticeshipExperience: e.target.checked
                  }))}
                />
                <label htmlFor="apprenticeshipExperience">Have apprenticeship/traineeship experience</label>
              </div>
            </div>

            {absData && (
              <div className="stats-highlight">
                <h4>Did you know? (ABS 2024 Data)</h4>
                <ul>
                  <li><strong>{absData.demographics.youngPeople15to24.totalEngagement}%</strong> of young people (15-24) are fully engaged in work and/or study</li>
                  <li><strong>{absData.demographics.employment.recentGraduateEmployment}%</strong> of 2023 graduates were employed in 2024</li>
                  <li>People with qualifications are <strong>{absData.demographics.employment.withQualificationEmployed - absData.demographics.employment.withoutQualificationEmployed}% more likely</strong> to be employed</li>
                  <li><strong>{absData.demographics.apprentices.constructionField}%</strong> of apprentices are in construction-related fields</li>
                </ul>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
              Save as Draft
            </button>
            <button type="submit" className="btn btn-primary">
              Submit for Review
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default SubmitArtwork;