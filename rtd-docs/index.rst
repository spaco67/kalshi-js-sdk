Kalshi JavaScript SDK Documentation
===================================

.. image:: https://img.shields.io/npm/v/kalshi-js-sdk.svg
   :target: https://www.npmjs.com/package/kalshi-js-sdk
   :alt: NPM version

.. image:: https://img.shields.io/github/stars/spaco67/kalshi-js-sdk.svg
   :target: https://github.com/spaco67/kalshi-js-sdk
   :alt: GitHub stars

.. image:: https://img.shields.io/npm/l/kalshi-js-sdk.svg
   :target: https://github.com/spaco67/kalshi-js-sdk/blob/main/LICENSE
   :alt: License

A production-grade, beginner-friendly JavaScript SDK for the Kalshi trading platform.

✅ **Complete TypeScript SDK** with full type definitions  
✅ **Universal compatibility** (Node.js and browser)  
✅ **Production-ready** with error handling and validation  
✅ **Comprehensive documentation** and examples  
✅ **Built and tested** - ready for immediate use

Quick Start
-----------

Installation
~~~~~~~~~~~~

.. code-block:: bash

   npm install kalshi-js-sdk

Basic Usage
~~~~~~~~~~~

.. code-block:: javascript

   import { KalshiClient } from 'kalshi-js-sdk';

   const client = new KalshiClient({
     apiKeyId: 'your-api-key-id',
     privateKey: 'your-private-key',
     environment: 'demo' // or 'production'
   });

   // Get markets
   const markets = await client.markets.getMarkets({
     status: 'open',
     limit: 10
   });

   // Get account balance
   const balance = await client.portfolio.getBalance();

   // Place an order
   const order = await client.trading.placeOrder({
     ticker: 'EXAMPLE-24-T1',
     side: 'yes',
     action: 'buy',
     count: 10,
     price: 0.55
   });

Features
--------

📊 **Market Data**
   - Real-time market information
   - Historical data access
   - Market filtering and search
   - Event contracts and outcomes

💰 **Portfolio Management**
   - Account balance tracking
   - Position monitoring
   - Trade history
   - P&L calculations

🎯 **Trading Operations**
   - Order placement and management
   - Fill tracking
   - Order cancellation
   - Trade execution

🔒 **Security & Authentication**
   - Secure API key management
   - Request signing
   - Rate limiting
   - Error handling

🌐 **Universal Compatibility**
   - Node.js support
   - Browser compatibility
   - TypeScript definitions
   - ESM and CommonJS

API Reference
-------------

.. toctree::
   :maxdepth: 2
   :caption: Documentation

   self

JavaScript API
~~~~~~~~~~~~~~

For detailed JavaScript API documentation, see the `TypeDoc documentation <https://spaco67.github.io/kalshi-js-sdk/>`_.

The SDK includes the following main classes:

- **KalshiClient**: Main client class for interacting with the Kalshi API
- **MarketService**: Service for market data and operations
- **PortfolioService**: Service for portfolio and balance management
- **TradeService**: Service for trading operations and order management

Development
-----------

GitHub Repository
~~~~~~~~~~~~~~~~~

Visit the `GitHub repository <https://github.com/spaco67/kalshi-js-sdk>`_ for source code, issues, and contributions.

NPM Package
~~~~~~~~~~~

View the `NPM package <https://www.npmjs.com/package/kalshi-js-sdk>`_ for installation and version information.

TypeDoc Documentation
~~~~~~~~~~~~~~~~~~~~~

For detailed API documentation generated from TypeScript, see the `TypeDoc documentation <https://spaco67.github.io/kalshi-js-sdk/>`_.

Support
-------

- **Issues**: `GitHub Issues <https://github.com/spaco67/kalshi-js-sdk/issues>`_
- **Kalshi API**: `Official API Documentation <https://trading-api.readme.io/>`_
- **NPM**: `Package Page <https://www.npmjs.com/package/kalshi-js-sdk>`_

License
-------

This project is licensed under the MIT License - see the `LICENSE <https://github.com/spaco67/kalshi-js-sdk/blob/main/LICENSE>`_ file for details.

**Author**: Timothy John Dake (timdake4@gmail.com)  
**Version**: 1.0.1

.. note::
   This SDK is not officially affiliated with Kalshi. Use at your own risk. Always test thoroughly in the demo environment before using in production.

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search` 