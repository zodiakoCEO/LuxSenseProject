import { useState, useEffect } from 'react';
import ApiService from '../services/api';
import type { UserProfile } from '../services/api';

interface UseUserProfileReturn {
  data: UserProfile | null;
  loading: boolean;
  error: Error | null;
}

export const useUserProfile = (): UseUserProfileReturn => {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getUserProfile();
        setData(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
