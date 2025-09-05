import { renderHook } from '@testing-library/react';
import {
  mockCurrentWorkspace$,
  MockAppStateProvider,
  mockAppStateContext,
} from '../mocks/mockAppState';
import { useWorkspace } from './useWorkspace';
import { firstValueFrom } from 'rxjs';

describe('useWorkspace', () => {
  beforeEach(() => {
    mockCurrentWorkspace$.next({
      id: 'workspace-123',
      displayName: 'Mock Workspace',
      portalName: 'mock-portal',
      workspaceName: 'mock-workspace',
      description: 'A mock workspace for testing',
      themeId: 'theme-1',
      themeName: 'Light Theme',
      footerLabel: 'Footer Mock',
      homePage: '/home',
      baseUrl: 'http://example.com',
      companyName: 'Mock Company',
      portalRoles: ['admin', 'user'],
      microfrontendRegistrations: [],
      logoUrl: 'http://example.com/logo.png',
      logoSmallImageUrl: 'http://example.com/logo-small.png',
      routes: [
        {
          appId: 'onecx-workspace-ui',
          productName: 'onecx-workspace',
          baseUrl: 'http://example.com/workspace/baseurl',
          endpoints: [
            { name: 'details', path: '/details/{id}' },
            { name: 'edit', path: '[[details]]' },
            { name: 'change', path: '[[edit]]' },
          ],
        },
      ],
    });
  });
  afterEach(() => {
    mockCurrentWorkspace$.destroy();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MockAppStateProvider mockAppState={mockAppStateContext}>
      {children}
    </MockAppStateProvider>
  );
  it('should construct the correct URL for a valid endpoint', async () => {
    const { result } = renderHook(() => useWorkspace(), { wrapper });

    const endpointParameters = { id: 5 };
    const url = await firstValueFrom(
      result.current.getUrl(
        'onecx-workspace',
        'onecx-workspace-ui',
        'details',
        endpointParameters
      )
    );

    expect(url).toBe('http://example.com/workspace/baseurl/details/5');
  });

  it('should return an empty string if baseUrl is not defined in workspace', async () => {
    mockCurrentWorkspace$.publish({
      id: 'workspace-1234',
      portalName: 'mock-portal',
      workspaceName: 'mock-workspace',
      baseUrl: '',
      routes: [],
      microfrontendRegistrations: [],
    });

    const { result } = renderHook(() => useWorkspace(), { wrapper });

    const url = await firstValueFrom(
      result.current.getUrl('onecx-workspace', 'onecx-workspace-ui', 'details')
    );

    expect(url).toBe('');
  });

  it('should return baseUrl when no route matches', async () => {
    const { result } = renderHook(() => useWorkspace(), { wrapper });
    const url = await firstValueFrom(
      result.current.getUrl('invalid-product', 'onecx-workspace-ui', 'details')
    );

    expect(url).toBe('http://example.com');
  });

  it('should return true when endpoint exists', async () => {
    const { result } = renderHook(() => useWorkspace(), { wrapper });
    const exists = await firstValueFrom(
      result.current.doesUrlExistFor(
        'onecx-workspace',
        'onecx-workspace-ui',
        'details'
      )
    );

    expect(exists).toBe(true);
  });

  it('should return false when endpoint does not exist', async () => {
    const { result } = renderHook(() => useWorkspace(), { wrapper });
    const exists = await firstValueFrom(
      result.current.doesUrlExistFor(
        'onecx-workspace',
        'onecx-workspace-ui',
        'non-existent'
      )
    );

    expect(exists).toBe(false);
  });

  it('should correctly handle missing parameters in endpoint path', async () => {
    const { result } = renderHook(() => useWorkspace(), { wrapper });
    const endpointParameters = { key: 'value' }; // Missing `id`
    const url = await firstValueFrom(
      result.current.getUrl(
        'onecx-workspace',
        'onecx-workspace-ui',
        'details',
        endpointParameters
      )
    );

    expect(url).toBe('http://example.com/workspace/baseurl');
  });
});
