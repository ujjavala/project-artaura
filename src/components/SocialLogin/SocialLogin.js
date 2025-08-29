import React, { useState } from 'react';
import './SocialLogin.css';

const SocialLogin = ({ onSocialLogin }) => {
  const [isLoading, setIsLoading] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: '🔍',
      color: '#db4437',
      bgColor: '#ffffff'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Ⓜ️',
      color: '#00a1f1',
      bgColor: '#ffffff'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      color: '#0077b5',
      bgColor: '#ffffff'
    }
  ];

  const handleSocialLogin = async (provider) => {
    setIsLoading(provider.id);
    
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful social login
      const userData = {
        id: Math.floor(Math.random() * 1000),
        username: `${provider.name.toLowerCase()}_user`,
        email: `user@${provider.name.toLowerCase()}.com`,
        name: `${provider.name} User`,
        division: 'Infrastructure Projects',
        role: 'Contributer',
        provider: provider.id,
        avatar: `https://ui-avatars.com/api/?name=${provider.name}+User&background=667eea&color=fff`
      };
      
      onSocialLogin(provider.id, userData);
      
    } catch (error) {
      console.error(`${provider.name} login failed:`, error);
      // Handle error appropriately
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="social-login">
      <div className="social-buttons">
        {socialProviders.map(provider => (
          <button
            key={provider.id}
            className={`social-btn ${provider.id}-btn`}
            onClick={() => handleSocialLogin(provider)}
            disabled={isLoading}
            style={{
              '--provider-color': provider.color,
              '--provider-bg': provider.bgColor
            }}
          >
            {isLoading === provider.id ? (
              <div className="social-spinner"></div>
            ) : (
              <>
                <span className="social-icon">{provider.icon}</span>
                <span className="social-text">Continue with {provider.name}</span>
              </>
            )}
          </button>
        ))}
      </div>
      
      <div className="social-info">
        <p className="social-disclaimer">
          By continuing, you agree to our Terms of Service and Privacy Policy.
          Your account will be linked to Australia systems.
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;