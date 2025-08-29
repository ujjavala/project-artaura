import React, { useState } from 'react';
import './Settings.css';

const Settings = ({ user }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
      socialMedia: {
        instagram: user?.socialMedia?.instagram || '',
        facebook: user?.socialMedia?.facebook || '',
        linkedin: user?.socialMedia?.linkedin || ''
      }
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      submissionUpdates: true,
      communityActivity: true,
      newProjectAlerts: true,
      weeklyDigest: false,
      featuredArtwork: true,
      collaborationInvites: true
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      allowMessages: true,
      allowCollaborations: true,
      showInSearchResults: true,
      dataCollection: true,
      marketingEmails: false
    },
    display: {
      theme: 'light',
      language: 'en-AU',
      dateFormat: 'DD/MM/YYYY',
      timezone: 'Australia/Sydney',
      artworkDisplayMode: 'grid',
      showTutorials: true,
      compactMode: false
    }
  });

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleNestedSettingChange = (section, parentKey, childKey, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentKey]: {
          ...prev[section][parentKey],
          [childKey]: value
        }
      }
    }));
  };

  const saveSettings = () => {
    console.log('Saving settings:', settings);
    // Here you would typically make an API call to save the settings
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      console.log('Resetting to defaults');
      // Reset logic here
    }
  };

  const exportData = () => {
    console.log('Exporting user data...');
    // Export user data logic here
  };

  const deleteAccount = () => {
    const confirmation = window.prompt(
      'Are you sure you want to delete your account? This action cannot be undone.\n\nType "DELETE" to confirm:'
    );
    if (confirmation === 'DELETE') {
      console.log('Account deletion requested');
      // Account deletion logic here
    }
  };

  const renderProfileSettings = () => (
    <div className="settings-content">
      <h2>👤 Profile Settings</h2>
      
      <div className="profile-avatar-section">
        <div className="current-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name || user.username} />
          ) : (
            <span className="avatar-initial">
              {(user?.name || user?.username)?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="avatar-actions">
          <button className="btn secondary">📷 Change Photo</button>
          <button className="btn secondary">🗑️ Remove</button>
        </div>
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
        
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={settings.profile.location}
            onChange={(e) => handleSettingChange('profile', 'location', e.target.value)}
            placeholder="City, State"
          />
        </div>
        
        <div className="form-group full-width">
          <label>Bio</label>
          <textarea
            value={settings.profile.bio}
            onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
            placeholder="Tell us about your artistic journey..."
            rows="4"
          />
        </div>
        
        <div className="form-group">
          <label>Website</label>
          <input
            type="url"
            value={settings.profile.website}
            onChange={(e) => handleSettingChange('profile', 'website', e.target.value)}
            placeholder="https://your-website.com"
          />
        </div>
      </div>
      
      <div className="social-media-section">
        <h3>🔗 Social Media Links</h3>
        <div className="social-form-grid">
          <div className="form-group">
            <label>📷 Instagram</label>
            <input
              type="text"
              value={settings.profile.socialMedia.instagram}
              onChange={(e) => handleNestedSettingChange('profile', 'socialMedia', 'instagram', e.target.value)}
              placeholder="@username"
            />
          </div>
          
          <div className="form-group">
            <label>📘 Facebook</label>
            <input
              type="text"
              value={settings.profile.socialMedia.facebook}
              onChange={(e) => handleNestedSettingChange('profile', 'socialMedia', 'facebook', e.target.value)}
              placeholder="facebook.com/username"
            />
          </div>
          
          <div className="form-group">
            <label>💼 LinkedIn</label>
            <input
              type="text"
              value={settings.profile.socialMedia.linkedin}
              onChange={(e) => handleNestedSettingChange('profile', 'socialMedia', 'linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-content">
      <h2>🔔 Notification Settings</h2>
      
      <div className="notification-categories">
        <div className="category-section">
          <h3>📧 Email Notifications</h3>
          <div className="toggle-group">
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Enable Email Notifications
              </label>
              <p>Receive important updates via email</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.submissionUpdates}
                  onChange={(e) => handleSettingChange('notifications', 'submissionUpdates', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Submission Status Updates
              </label>
              <p>Get notified when your artwork submissions are reviewed</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.newProjectAlerts}
                  onChange={(e) => handleSettingChange('notifications', 'newProjectAlerts', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                New Project Alerts
              </label>
              <p>Be the first to know about new infrastructure art opportunities</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.weeklyDigest}
                  onChange={(e) => handleSettingChange('notifications', 'weeklyDigest', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Weekly Community Digest
              </label>
              <p>Weekly summary of community activity and highlights</p>
            </div>
          </div>
        </div>
        
        <div className="category-section">
          <h3>📱 Push Notifications</h3>
          <div className="toggle-group">
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.pushNotifications}
                  onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Enable Push Notifications
              </label>
              <p>Receive instant notifications in your browser</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.communityActivity}
                  onChange={(e) => handleSettingChange('notifications', 'communityActivity', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Community Activity
              </label>
              <p>Likes, comments, and shares on your artworks</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.featuredArtwork}
                  onChange={(e) => handleSettingChange('notifications', 'featuredArtwork', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Featured Artwork
              </label>
              <p>When your artwork gets featured in showcases</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.collaborationInvites}
                  onChange={(e) => handleSettingChange('notifications', 'collaborationInvites', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Collaboration Invites
              </label>
              <p>Invitations to join collaborative art projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="settings-content">
      <h2>🔒 Privacy & Security</h2>
      
      <div className="privacy-sections">
        <div className="privacy-section">
          <h3>👁️ Profile Visibility</h3>
          <div className="radio-group">
            <label className="radio-item">
              <input
                type="radio"
                name="profileVisibility"
                value="public"
                checked={settings.privacy.profileVisibility === 'public'}
                onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
              />
              <span className="radio-button"></span>
              <div>
                <strong>Public</strong>
                <p>Your profile and artworks are visible to everyone</p>
              </div>
            </label>
            
            <label className="radio-item">
              <input
                type="radio"
                name="profileVisibility"
                value="community"
                checked={settings.privacy.profileVisibility === 'community'}
                onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
              />
              <span className="radio-button"></span>
              <div>
                <strong>Community Only</strong>
                <p>Visible only to registered Artaura members</p>
              </div>
            </label>
            
            <label className="radio-item">
              <input
                type="radio"
                name="profileVisibility"
                value="private"
                checked={settings.privacy.profileVisibility === 'private'}
                onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
              />
              <span className="radio-button"></span>
              <div>
                <strong>Private</strong>
                <p>Only you can see your profile and artworks</p>
              </div>
            </label>
          </div>
        </div>
        
        <div className="privacy-section">
          <h3>📞 Contact Information</h3>
          <div className="toggle-group">
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.privacy.showEmail}
                  onChange={(e) => handleSettingChange('privacy', 'showEmail', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Show Email Address
              </label>
              <p>Allow others to see your email address</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.privacy.showPhone}
                  onChange={(e) => handleSettingChange('privacy', 'showPhone', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Show Phone Number
              </label>
              <p>Allow others to see your phone number</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.privacy.allowMessages}
                  onChange={(e) => handleSettingChange('privacy', 'allowMessages', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Allow Direct Messages
              </label>
              <p>Let other artists send you private messages</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.privacy.allowCollaborations}
                  onChange={(e) => handleSettingChange('privacy', 'allowCollaborations', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Allow Collaboration Requests
              </label>
              <p>Receive invitations for collaborative projects</p>
            </div>
          </div>
        </div>
        
        <div className="privacy-section">
          <h3>🔍 Search & Discovery</h3>
          <div className="toggle-group">
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.privacy.showInSearchResults}
                  onChange={(e) => handleSettingChange('privacy', 'showInSearchResults', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Show in Search Results
              </label>
              <p>Allow your profile to appear in search results</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.privacy.dataCollection}
                  onChange={(e) => handleSettingChange('privacy', 'dataCollection', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Analytics Data Collection
              </label>
              <p>Help improve Artaura by sharing anonymous usage data</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.privacy.marketingEmails}
                  onChange={(e) => handleSettingChange('privacy', 'marketingEmails', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Marketing Communications
              </label>
              <p>Receive updates about new features and community events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDisplaySettings = () => (
    <div className="settings-content">
      <h2>🎨 Display & Preferences</h2>
      
      <div className="display-sections">
        <div className="display-section">
          <h3>🌓 Appearance</h3>
          <div className="preference-group">
            <div className="preference-item">
              <label>Theme</label>
              <select
                value={settings.display.theme}
                onChange={(e) => handleSettingChange('display', 'theme', e.target.value)}
              >
                <option value="light">☀️ Light Mode</option>
                <option value="dark">🌙 Dark Mode</option>
                <option value="auto">🔄 Auto (System)</option>
              </select>
            </div>
            
            <div className="preference-item">
              <label>Language</label>
              <select
                value={settings.display.language}
                onChange={(e) => handleSettingChange('display', 'language', e.target.value)}
              >
                <option value="en-AU">🇦🇺 English (Australia)</option>
                <option value="en-US">🇺🇸 English (US)</option>
                <option value="en-GB">🇬🇧 English (UK)</option>
              </select>
            </div>
            
            <div className="preference-item">
              <label>Date Format</label>
              <select
                value={settings.display.dateFormat}
                onChange={(e) => handleSettingChange('display', 'dateFormat', e.target.value)}
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            
            <div className="preference-item">
              <label>Timezone</label>
              <select
                value={settings.display.timezone}
                onChange={(e) => handleSettingChange('display', 'timezone', e.target.value)}
              >
                <option value="Australia/Sydney">Sydney (AEDT)</option>
                <option value="Australia/Melbourne">Melbourne (AEDT)</option>
                <option value="Australia/Brisbane">Brisbane (AEST)</option>
                <option value="Australia/Perth">Perth (AWST)</option>
                <option value="Australia/Adelaide">Adelaide (ACDT)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="display-section">
          <h3>🖼️ Artwork Display</h3>
          <div className="preference-group">
            <div className="preference-item">
              <label>Default View Mode</label>
              <select
                value={settings.display.artworkDisplayMode}
                onChange={(e) => handleSettingChange('display', 'artworkDisplayMode', e.target.value)}
              >
                <option value="grid">⊞ Grid View</option>
                <option value="list">☰ List View</option>
                <option value="masonry">⚏ Masonry View</option>
              </select>
            </div>
          </div>
          
          <div className="toggle-group">
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.display.showTutorials}
                  onChange={(e) => handleSettingChange('display', 'showTutorials', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Show Helpful Tutorials
              </label>
              <p>Display tips and tutorials for new features</p>
            </div>
            
            <div className="toggle-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings.display.compactMode}
                  onChange={(e) => handleSettingChange('display', 'compactMode', e.target.checked)}
                />
                <span className="toggle-slider"></span>
                Compact Mode
              </label>
              <p>Use smaller spacing and condensed layout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountActions = () => (
    <div className="settings-content">
      <h2>⚠️ Account Management</h2>
      
      <div className="account-actions">
        <div className="action-section">
          <h3>📦 Data Export</h3>
          <p>Download a copy of all your data including artworks, submissions, and account information.</p>
          <button className="btn secondary" onClick={exportData}>
            📥 Export My Data
          </button>
        </div>
        
        <div className="action-section">
          <h3>🔄 Reset Settings</h3>
          <p>Reset all settings to their default values. This cannot be undone.</p>
          <button className="btn secondary" onClick={resetToDefaults}>
            🔄 Reset to Defaults
          </button>
        </div>
        
        <div className="action-section danger">
          <h3>❌ Delete Account</h3>
          <p>Permanently delete your Artaura account and all associated data. This action cannot be reversed.</p>
          <button className="btn danger" onClick={deleteAccount}>
            🗑️ Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'display':
        return renderDisplaySettings();
      case 'account':
        return renderAccountActions();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>⚙️ Account Settings</h1>
          <p>Manage your Artaura account preferences and privacy settings</p>
        </div>

        <div className="settings-layout">
          <div className="settings-sidebar">
            <nav className="settings-nav">
              <button 
                className={activeSection === 'profile' ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveSection('profile')}
              >
                <span className="nav-icon">👤</span>
                Profile Settings
              </button>
              
              <button 
                className={activeSection === 'notifications' ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveSection('notifications')}
              >
                <span className="nav-icon">🔔</span>
                Notifications
              </button>
              
              <button 
                className={activeSection === 'privacy' ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveSection('privacy')}
              >
                <span className="nav-icon">🔒</span>
                Privacy & Security
              </button>
              
              <button 
                className={activeSection === 'display' ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveSection('display')}
              >
                <span className="nav-icon">🎨</span>
                Display & Preferences
              </button>
              
              <button 
                className={activeSection === 'account' ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveSection('account')}
              >
                <span className="nav-icon">⚠️</span>
                Account Management
              </button>
            </nav>
          </div>

          <div className="settings-main">
            {renderSettingsContent()}
            
            <div className="settings-actions">
              <button className="btn primary" onClick={saveSettings}>
                💾 Save Changes
              </button>
              <button className="btn secondary">
                🚫 Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;