import React, { useState } from 'react';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      const userData = {
        id: 1,
        username: formData.username,
        email: `${formData.username}@mailinator.com`,
        division: 'Infrastructure Projects',
        role: 'Project Coordinator'
      };
      
      const token = 'mock-jwt-token-' + Date.now();
      onLogin(userData, token);
      
    } catch (error) {
      setErrors({
        general: 'Login failed. Please check your credentials.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform, userData) => {
    const mockToken = `${platform}-token-${Date.now()}`;
    onLogin(userData, mockToken);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card card">
          <div className="card-header">
            <h1 className="card-title">Artaura</h1>
            <p className="card-subtitle">Art Beyond Barriers - Transforming construction sites into inclusive art spaces</p>
          </div>

          {errors.general && (
            <div className="alert alert-danger">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username or Email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                placeholder="Enter your username or email"
                disabled={isLoading}
              />
              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-100 ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <SocialLogin onSocialLogin={handleSocialLogin} />

          <div className="login-footer">
            <p>
              Don't have an account? 
              <a href="#" className="link">Contact your administrator</a>
            </p>
          </div>
        </div>

        <div className="login-info">
          <h2>Transform Barriers into Bridges</h2>
          <p>
            Join the Artaura initiative and help transform construction sites 
            across Australia into vibrant, inclusive art spaces that celebrate diversity and 
            strengthen communities.
          </p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span>Upload and manage art submissions</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🤝</span>
              <span>Connect with local artists and communities</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Track project progress and impact</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;