'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../store/store';
import { add } from '@/store/features/card/cardSlice';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    //we can aslo set initial value buz on refresh data will gone so sometome we  store data on localStarage in browers
    storeRef.current.dispatch(add([])); //check on browser in redux extension we can also learn in redux docs if need caching
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
