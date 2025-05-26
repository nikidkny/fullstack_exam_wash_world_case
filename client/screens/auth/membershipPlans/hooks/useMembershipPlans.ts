import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getAll } from '../membershipPlansSlice';

export const useMembershipPlans = () => {
    const dispatch = useDispatch<AppDispatch>();
    const membershipPlans = useSelector((state: RootState) => state.membershipPlans.membershipPlans);
    const error = useSelector((state: RootState) => state.membershipPlans.error);

    useEffect(() => {
    if (!membershipPlans || Array.isArray(membershipPlans) && membershipPlans.length === 0) {
        console.log("Fetching data");
        dispatch(getAll());
    }
}, [dispatch, membershipPlans]);

    return { membershipPlans, error };
};
