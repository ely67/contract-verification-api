const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supported chains
const SUPPORTED_CHAINS = {
  1: {
    name: 'Ethereum Mainnet',
    explorerUrl: 'https://etherscan.io'
  },
  11155111: {
    name: 'Ethereum Sepolia', 
    explorerUrl: 'https://sepolia.etherscan.io'
  },
  137: {
    name: 'Polygon Mainnet',
    explorerUrl: 'https://polygonscan.com'
  },
  80001: {
    name: 'Polygon Mumbai',
    explorerUrl: 'https://mumbai.polygonscan.com'
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Contract Verification Dashboard API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      chains: '/api/verification/chains',
      verify: '/api/verification/verify',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/verification/chains', (req, res) => {
  const chains = Object.entries(SUPPORTED_CHAINS).map(([chainId, info]) => ({
    chainId: parseInt(chainId),
    name: info.name,
    explorerUrl: info.explorerUrl
  }));
  
  res.json({
    success: true,
    data: chains
  });
});

app.post('/api/verification/verify', (req, res) => {
  const { address, chainId } = req.body;
  
  if (!address || !chainId) {
    return res.status(400).json({
      success: false,
      error: 'Address and chainId are required'
    });
  }
  
  if (!SUPPORTED_CHAINS[chainId]) {
    return res.status(400).json({
      success: false,
      error: `Chain ID ${chainId} is not supported`
    });
  }
  
  const mockResult = {
    address: address,
    chainId: chainId,
    chainName: SUPPORTED_CHAINS[chainId].name,
    isVerified: Math.random() > 0.3,
    contractName: 'MockContract',
    compilerVersion: 'v0.8.19+commit.7dd6d404',
    optimizationEnabled: true,
    sourceCodeAvailable: true,
    verificationDate: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: mockResult
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Contract Verification API running on port ${PORT}`);
  console.log(`📖 Documentation: http://localhost:${PORT}`);
});

module.exports = app;