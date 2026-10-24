

import React, { useState, useCallback, useEffect } from 'react';
import type { Phone } from '../types';
import { fetchPhone } from '../api/phoneApi';
import { SelectPhoneApp } from './SelectPhoneApp';
import { Loading } from '../components/Loading';
import { ErrorBox } from '../components/ErrorBox';

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);

    try {
      const data = await fetchPhone('1');
      setPhone(data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Không thể tải dữ liệu'
      );
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error !== null) {
    return <ErrorBox message={error} onRetry={load} />;
  }

  if (phone === null) {
    return <Loading />;
  }

  return <SelectPhoneApp phone={phone} />;
}
