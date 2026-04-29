import { useState, useCallback } from 'react';
import API from '../services/api';
import { useNotification } from '../context/NotificationContext';

/**
 * Custom hook for making API requests with built-in loading and error state handling.
 */
export const useFetch = (defaultUrl = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { error: showError } = useNotification();

  const request = useCallback(async (method, url, body = null, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        url: url || defaultUrl,
        data: body,
        ...options
      };

      const response = await API(config);
      setData(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong.';
      setError(errorMessage);
      if (options.showErrorToast !== false) {
        showError(errorMessage);
      }
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [defaultUrl, showError]);

  const get = useCallback((url, options) => request('GET', url, null, options), [request]);
  const post = useCallback((url, body, options) => request('POST', url, body, options), [request]);
  const put = useCallback((url, body, options) => request('PUT', url, body, options), [request]);
  const del = useCallback((url, options) => request('DELETE', url, null, options), [request]);

  return { data, loading, error, get, post, put, del, request, setData };
};

export default useFetch;
