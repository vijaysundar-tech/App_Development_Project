import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

// Infrastructure: matchMedia & Axios Mocking
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};

jest.mock('axios', () => {
  const mockAxios = {
    create: jest.fn(() => mockAxios),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    },
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    defaults: { headers: { common: {} } }
  };
  return mockAxios;
});

import axios from 'axios';

// Import ACTUAL project components
import Login from '../components/Login';
import Navbar from '../components/layout/Navbar';
import ErrorHandler from '../components/ErrorHandler';
import App from '../App';
import CryptoAssetList from '../components/assets/CryptoAssetList';
import CryptoAssetForm from '../components/assets/CryptoAssetForm';
import UserWalletList from '../components/wallets/UserWalletList';
import UserWalletForm from '../components/wallets/UserWalletForm';
import RecipientAccountList from '../components/accounts/RecipientAccountList';
import RecipientAccountForm from '../components/accounts/RecipientAccountForm';
import BridgeTransactionList from '../components/transactions/BridgeTransactionList';
import BridgeTransactionForm from '../components/transactions/BridgeTransactionForm';

const createTestStore = (initialState = {}) =>
  configureStore({
    reducer: {
      auth: (state = initialState.auth || { isAuthenticated: false, user: null }) => state,
      transactions: (state = initialState.transactions || { items: [] }) => state,
      assets: (state = initialState.assets || { items: [] }) => state,
      wallets: (state = initialState.wallets || { items: [] }) => state,
      accounts: (state = initialState.accounts || { items: [] }) => state
    }
  });

const renderWithProviders = (ui, { state } = {}) => {
  const store = createTestStore(state);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('BitBridge Frontend Standalone Evaluation Engine (30 Tests)', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
    axios.post.mockImplementation(() => Promise.resolve({ data: {} }));
    axios.put.mockImplementation(() => Promise.resolve({ data: {} }));
    axios.delete.mockImplementation(() => Promise.resolve({ data: {} }));
  });

  // FIRST 5 TESTS: Folder Structure & Import Verification

  test('T01 - Structure: Login component file is present', () => {
    expect(Login).toBeDefined();
  });

  test('T02 - Structure: bridgeTransactionService file is present', async () => {
    const service = await import('../services/bridgeTransactionService');
    expect(service.default).toBeDefined();
  });

  test('T03 - Structure: authSlice store file is present', async () => {
    const slice = await import('../store/slices/authSlice');
    expect(slice.default).toBeDefined();
  });

  test('T04 - Structure: Navbar layout component file is present', () => {
    expect(Navbar).toBeDefined();
  });

  test('T05 - Structure: ErrorHandler component file is present', () => {
    expect(ErrorHandler).toBeDefined();
  });

  // REMAINING 25 TESTS: Real Logical & Behavioral Verification

  test('T06 - Navbar: Displays personalized operator greet when authenticated', () => {
    renderWithProviders(<Navbar />, { 
        state: { auth: { isAuthenticated: true, user: { fullName: 'Operator X' } } } 
    });
    expect(screen.getByText(/Welcome back! Operator X/i)).toBeInTheDocument();
  });

  test('T07 - TransactionList: Integration with axios fetching lifecycle', () => {
    renderWithProviders(<BridgeTransactionList />, { state: { transactions: { items: [{ id: 1, transactionReference: 'BB-LOGIC', bridgeStatus: 'PENDING' }] } } });
    expect(screen.getByText('BB-LOGIC')).toBeInTheDocument();
  });

  test('T08 - Services: userWalletService connectivity mapping', async () => {
    const service = await import('../services/userWalletService');
    expect(service.default.getByUser).toBeDefined();
    expect(typeof service.default.disconnect).toBe('function');
  });

  test('T09 - TransactionForm: Triggers initiation logic on submit trigger', async () => {
    axios.post.mockResolvedValueOnce({ status: 201, data: {} });
    renderWithProviders(<BridgeTransactionForm />);
    const btn = screen.getByRole('button', { name: /Execute Settlement/i });
    fireEvent.click(btn);
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });

  test('T10 - Redux: authSlice reducer updates state correctly on loginSuccess', async () => {
    const reducer = require('../store/slices/authSlice').default;
    const { loginSuccess } = require('../store/slices/authSlice');
    const nextState = reducer(undefined, loginSuccess({ token: 'test-token', fullName: 'Operator X' }));
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.token).toBe('test-token');
    expect(nextState.user.fullName).toBe('Operator X');
  });

  test('T11 - Routing: Redirects protected access attempts for guests', () => {
    renderWithProviders(<App />, {
      state: { auth: { isAuthenticated: false, user: null } }
    });
    expect(screen.getByText(/Bridge Login/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/0x.../i)).not.toBeInTheDocument();
  });

  test('T12 - Login: Input fields verify specific BitBridge placeholders', () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText(/e.g. operator@bitbridge.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Simulation credentials/i)).toBeInTheDocument();
  });

  test('T13 - ErrorHandler: Displays the distinct "Bridge Error Detected" header', () => {
    renderWithProviders(<ErrorHandler error="SERVICE_BUSY" />);
    expect(screen.getByText(/Bridge Error Detected/i)).toBeInTheDocument();
    expect(screen.getByText(/SERVICE_BUSY/i)).toBeInTheDocument();
  });

  test('T14 - UI UX: List component Card wrapping verified', () => {
    const { container } = renderWithProviders(<CryptoAssetList />);
    expect(container.querySelector('.card')).toBeInTheDocument();
  });

  test('T15 - Form Logic: Required validation enforced in CryptoAssetForm', () => {
    renderWithProviders(<CryptoAssetForm />);
    expect(screen.getByPlaceholderText(/e.g. BTC/i)).toBeRequired();
    expect(screen.getByPlaceholderText(/e.g. Bitcoin/i)).toBeRequired();
  });

  test('T16 - Redux: bridgeTransactionSlice addSettlement appends a new settlement correctly', () => {
    const reducer = require('../store/slices/bridgeTransactionSlice').default;
    const { addSettlement } = require('../store/slices/bridgeTransactionSlice');
    const initialState = { items: [] };
    const newSettlement = { id: 1, transactionReference: 'BB-12345678', bridgeStatus: 'INITIATED' };
    const nextState = reducer(initialState, addSettlement(newSettlement));
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual(newSettlement);
  });

  test('T17 - CRUD: Displays backend success message after deleting a settlement', async () => {
    // 1. Mock the API DELETE call
    axios.delete.mockResolvedValueOnce({ status: 200, data: "BridgeTransaction deleted successfully." });

    // 2. Render the TransactionList component
    renderWithProviders(<BridgeTransactionList />, { 
      state: { transactions: { items: [{ id: 101, transactionReference: 'BB-9922', cryptoAmount: 0.5, fiatValue: 1200, bridgeStatus: 'PENDING' }] } } 
    });

    // 3. Action: Click the Delete button
    const deleteBtn = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteBtn);

    // 4. Verification: Check for the exact backend confirmation string
    await waitFor(() => {
      expect(screen.getByText("BridgeTransaction deleted successfully.")).toBeInTheDocument();
    });
    console.log('CRUD logic: Settlement deletion feedback verified');
  });

  test('T18 - CRUD: Displays backend success message after disconnecting a wallet', async () => {
    // 1. Mock the API DELETE call
    axios.delete.mockResolvedValueOnce({ status: 200, data: "UserWallet deleted successfully." });

    // 2. Render the UserWalletList component
    renderWithProviders(<UserWalletList />, { 
      state: { wallets: { items: [{ id: 202, walletProvider: 'METAMASK', walletPublicKey: '0xABC123', lastKnownBalance: 1.5 }] } } 
    });

    // 3. Action: Click the Disconnect button
    const deleteBtn = screen.getByRole('button', { name: /Disconnect/i });
    fireEvent.click(deleteBtn);

    // 4. Verification: Check for the exact backend confirmation string
    await waitFor(() => {
      expect(screen.getByText("UserWallet deleted successfully.")).toBeInTheDocument();
    });
    console.log('CRUD logic: Wallet disconnection feedback verified');
  });

  test('T19 - CRUD: Displays backend success message after clearing a bank account', async () => {
    // 1. Mock the API DELETE call
    axios.delete.mockResolvedValueOnce({ status: 200, data: "RecipientAccount deleted successfully." });

    // 2. Render the RecipientAccountList component
    renderWithProviders(<RecipientAccountList />, { 
      state: { accounts: { items: [{ id: 303, bankDisplayName: 'Swiss National', ibanNumber: 'CH123', fiatCurrency: 'CHF' }] } } 
    });

    // 3. Action: Click the Clear button
    const deleteBtn = screen.getByRole('button', { name: /Clear/i });
    fireEvent.click(deleteBtn);

    // 4. Verification: Check for the exact backend confirmation string
    await waitFor(() => {
      expect(screen.getByText("RecipientAccount deleted successfully.")).toBeInTheDocument();
    });
    console.log('CRUD logic: Bank account disposal feedback verified');
  });

  test('T20 - CRUD: Displays backend success message after removing a crypto asset', async () => {
    // 1. Mock the API DELETE call
    axios.delete.mockResolvedValueOnce({ status: 200, data: "CryptoAsset deleted successfully." });

    // 2. Render the CryptoAssetList component
    renderWithProviders(<CryptoAssetList />, { 
      state: { assets: { items: [{ id: 404, assetSymbol: 'DOT', assetName: 'Polkadot', protocolNetwork: 'Polkadot', currentLiquidity: 5000 }] } } 
    });

    // 3. Action: Click the Delete button
    const deleteBtn = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteBtn);

    // 4. Verification: Check for the exact backend confirmation string
    await waitFor(() => {
      expect(screen.getByText("CryptoAsset deleted successfully.")).toBeInTheDocument();
    });
    console.log('CRUD logic: Asset removal feedback verified');
  });

  test('T21 - Resilience: Renders external error codes via ErrorHandler', () => {
    renderWithProviders(<ErrorHandler error="500 Internal Error" />);
    expect(screen.getByText(/500/i)).toBeInTheDocument();
  });

  test('T22 - Resilience: ErrorHandler does not render when no error is present', () => {
    const { container } = renderWithProviders(<ErrorHandler error={null} />);
    expect(container.firstChild).toBeNull();
  });

 test('T23 - CryptoAssetForm: Validates numeric input types and required attributes', () => {
    renderWithProviders(<CryptoAssetForm />);

    // 1. Check for specific professional input types
    const liqInput = screen.getByLabelText(/Initial Simulation Liquidity/i);
    expect(liqInput).toHaveAttribute('type', 'number'); // Verifies technical numeric behavior

    // 2. Check for Required validation attribute
    const tickerInput = screen.getByPlaceholderText(/e.g. BTC/i);
    expect(tickerInput).toBeRequired(); // Validation happens in HTML first

    // 3. Verify Form contains a "Main" action button
    const submitBtn = screen.getByRole('button', { name: /Register Asset/i });
    expect(submitBtn).toBeEnabled();

    console.log('Component Logic: CryptoAssetForm input types and validation rules verified');
  });

  test('T24 - RecipientAccountForm: Validates bank input requirements and roles', () => {
    renderWithProviders(<RecipientAccountForm />);

    // 1. Check for required Bank Nickname
    const bankInput = screen.getByLabelText(/Bank Nickname/i);
    expect(bankInput).toHaveAttribute('type', 'text');
    expect(bankInput).toBeRequired();

    // 2. Check for required IBAN
    const ibanInput = screen.getByPlaceholderText(/Enter full IBAN/i);
    expect(ibanInput).toBeRequired();

    // 3. Verify Form action button
    const submitBtn = screen.getByRole('button', { name: /Register Account/i });
    expect(submitBtn).toBeInTheDocument();

    console.log('Component Logic: RecipientAccountForm validation state verified');
  });


  test('T25 - Attributes: UserWalletForm public key field has type text', () => {
    renderWithProviders(<UserWalletForm />);
    expect(screen.getByPlaceholderText(/0x.../i)).toHaveAttribute('type', 'text');
  });

  test('T26 - Assets: Validates that list sections use "list-container" class', () => {
    const { container } = renderWithProviders(<BridgeTransactionList />);
    expect(container.firstChild).toHaveClass('list-container');
  });

  test('T27 - Style: Core Action buttons verify explicit cursor pointer', () => {
    renderWithProviders(<Navbar />, { 
        state: { auth: { isAuthenticated: true, user: { fullName: 'Operator X' } } } 
    });
    const btn = screen.getByRole('button', { name: /Logout/i });
    expect(btn).toHaveStyle('cursor: pointer');
  });

  test('T28 - Style: Navigation bar verifies flex-level display logic', () => {
    renderWithProviders(<Navbar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveStyle('display: flex');
  });

  test('T29 - Layout: Domain sections verify card-header presence', () => {
    const { container } = renderWithProviders(<BridgeTransactionList />);
    expect(container.querySelector('.card-header')).toBeInTheDocument();
  });

  test('T30 - Hero: Main Simulator heading validates 48px baseline style', () => {
    renderWithProviders(<App />, {
      state: { auth: { isAuthenticated: true, user: { fullName: 'Operator X' } } }
    });
    const hero = screen.getByText(/BitBridge Simulator/i);
    expect(hero).toHaveStyle('font-size: 48px');
  });

});
