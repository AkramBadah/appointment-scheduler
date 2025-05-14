import { describe, it, expect, vi, afterEach } from 'vitest';
import { get, post, put, del } from '../fetchUtils';

describe('Fetch utils', () => {
  afterEach(() => {
    vi.restoreAllMocks(); // Reset mocks after each test
  });

  it('should make a GET request', async () => {
    const mockResponse = { data: 'some data' };
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as any);

    const result = await get('/some-endpoint');
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/some-endpoint',
      expect.any(Object)
    );
  });

  it('should make a POST request', async () => {
    const mockResponse = { id: 1, name: 'New Appointment' };
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as any);

    const result = await post('/appointments', { name: 'New Appointment' });
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/appointments',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'New Appointment' }),
      })
    );
  });

  it('should make a PUT request', async () => {
    const mockResponse = { success: true };
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as any);

    const result = await put('/appointments/1', { name: 'Updated' });
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/appointments/1',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ name: 'Updated' }),
      })
    );
  });

  it('should make a DELETE request', async () => {
    const mockResponse = { deleted: true };
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as any);

    const result = await del('/appointments/1');
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/appointments/1',
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });

  it('should handle fetch errors (non-ok response)', async () => {
    const errorMessage = 'Something went wrong';
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ message: errorMessage }),
    } as any);

    await expect(get('/error')).rejects.toThrow(errorMessage);
  });

  it('should handle fetch exceptions (network error)', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    await expect(get('/network-error')).rejects.toThrow('Network error');
  });
});
