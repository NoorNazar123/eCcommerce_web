'use client';

import { useState, useEffect } from 'react';
import { getProfile } from '@/lib/action';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      ProfilePage
      {error ? (
        <p>There was an error loading the profile. Only admin can access</p>
      ) : profile ? (
        <p>{JSON.stringify(profile)}</p>
      ) : (
        <p>You cannot access this page. Please log in.</p>
      )}
    </div>
  );
};

export default ProfilePage;
